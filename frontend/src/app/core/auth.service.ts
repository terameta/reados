import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

export type AuthSession = {
	user: {
		id: string,
		email: string,
		displayName: string,
	},
	token: string,
}
@Injectable( { providedIn: 'root' } )
export class AuthService {

	public session$ = new BehaviorSubject<AuthSession | null>( null );
	public isAuthenticated = false;

	private jwtHelper = new JwtHelperService();

	constructor( private storageService: StorageService, private httpClient: HttpClient, private messageService: MessageService, private router: Router ) {
		this.storageService.storage$.
			pipe(
				map( ( values: any ) => {
					return values.token;
				} ),
				distinctUntilChanged(),
			).
			subscribe( {
				next: ( encodedToken ) => {
					if ( encodedToken ) {
						const token = this.jwtHelper.decodeToken( encodedToken );
						const session = {
							user: {
								id: token.id,
								email: token.email,
								displayName: token.displayName || token.email,
							},
							token: encodedToken,
						};
						this.session$.next( session );
						this.isAuthenticated = true;
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

	public signOut = async () => {
		await this.storageService.delete( 'token' );
		this.isAuthenticated = false;
		this.router.navigate( [ '/sign-in' ] );
	};
}
