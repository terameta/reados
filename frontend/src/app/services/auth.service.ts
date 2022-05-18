import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthSession } from '@typedefs/auth-session';

@Injectable( { providedIn: 'root' } )
export class AuthService {

	public session$ = new BehaviorSubject<AuthSession | null>( null );
	public isAuthenticated$ = new BehaviorSubject<boolean | null>( null );

	private jwtHelper = new JwtHelperService();

	constructor( private storageService: StorageService, private httpClient: HttpClient, private messageService: MessageService, private router: Router ) {
		this.storageService.storage$.
			pipe(
				filter( ( storage ) => storage !== null ),
				map( ( values: any ) => {
					return values.token;
				} ),
				distinctUntilChanged(),
			).
			subscribe( {
				next: async ( encodedToken ) => {
					if ( encodedToken ) {
						const user = this.jwtHelper.decodeToken( encodedToken );

						const session = {
							user,
							token: encodedToken,
						};
						this.session$.next( session );
						this.isAuthenticated$.next( true );
						await this.waitNavigated();
						if ( this.router.url === '/' && user.type === 'admin' ) {
							this.router.navigate( [ '/admin' ] );
						}
					} else {
						this.signOut();
					}
				}
			} );
	}

	public signIn = ( email: string, password: string ) => {
		return new Promise<void>( ( resolve ) => {
			this.httpClient.post<{ token: string }>( '/func-customer-sign-in', { email, password } ).subscribe( {
				next: async ( data ) => {
					if ( data?.token ) {
						await this.storageService.put( 'token', data.token );
						this.router.navigate( [ '/' ] );
					} else {
						this.messageService.add( { severity: 'error', summary: 'Authentication failed', detail: 'Server error, please try again later', key: 'center', sticky: true } );
					}
					resolve();
				},
				error: ( error ) => {
					console.log( error );
					const detail = error.error?.message || 'Server error, please try again later';
					this.messageService.add( { severity: 'error', summary: 'Authentication failed', detail, key: 'center', sticky: true } );
					resolve();
				},
			} );
		} );
	};

	public signUp = ( email: string, password: string ) => {
		return new Promise<void>( ( resolve ) => {
			this.httpClient.post<{ token: string }>( '/func-customer-sign-up', { email, password } ).subscribe( {
				next: async ( data ) => {
					if ( data?.token ) {
						await this.storageService.put( 'token', data.token );
						this.router.navigate( [ '/' ] );
					} else {
						this.messageService.add( { severity: 'error', summary: 'Sign up failed', detail: 'Server error, please try again later', key: 'center', sticky: true } );
					}
					resolve();
				},
				error: ( error ) => {
					const detail = error.error?.message || 'Server error, please try again later';
					this.messageService.add( { severity: 'error', summary: 'Sign up failed', detail, key: 'center', sticky: true } );
					resolve();
				},
			} );
		} );
	}

	public signOut = async ( withRedirect = true ) => {
		await this.storageService.delete( 'token' );
		this.isAuthenticated$.next( false );
		this.session$.next( null );

		if ( withRedirect ) {

			await this.waitNavigated();

			if ( this.router.url !== '/sign-up' && this.router.url !== '/' ) {
				this.router.navigate( [ '/sign-in' ] );
			}
		}

	};

	private waitNavigated = () => {
		return new Promise<void>( ( resolve ) => {
			setTimeout( () => {
				if ( this.router.navigated ) {
					resolve();
				} else {
					// file deepcode ignore PromiseNotCaughtGeneral: This is a type of function that only resolves, never throws. Therefore no need to catch
					this.waitNavigated().then( resolve );
				}
			}, 33 );
		} );
	}
}
