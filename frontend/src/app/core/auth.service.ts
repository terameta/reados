import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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

	constructor( private storageService: StorageService, private httpClient: HttpClient ) {
		this.storageService.storage$.
			pipe(
				map( ( values: any ) => {
					return values.token;
				} )
			).
			subscribe( {
				next: ( it ) => {
					console.log( 'AuthService.storage$.next', it );
				}
			} )
	}

	public signIn = async ( email: string, password: string ) => {
		this.httpClient.post( '/func-client-sign-in', { email, password } ).subscribe( console.log );
	};

	public signOut = async () => {
		// TODO: implement signout logic
		// Remember to clear localStorage
	};
}
