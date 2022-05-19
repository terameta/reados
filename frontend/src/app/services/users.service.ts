import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@typedefs/user';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { getNonNullValue } from '@utilities/misc/waitNonNull';

@Injectable( { providedIn: 'root' } )
export class UsersService {

	public users$ = new BehaviorSubject<User[] | null>( null );

	constructor( private httpClient: HttpClient ) {
		this.refreshUsers();
	}


	public refreshUsers = async () => {
		const users = await lastValueFrom( this.httpClient.get<User[]>( '/func-users-get' ) );
		this.users$.next( users );
	}

	public getUser = async ( id: string ) => {
		await getNonNullValue( this.users$ );
		const user = this.findUser( id );
		if ( user ) {
			return user;
		} else {
			await this.refreshUsers();
			return this.findUser( id );
		}
	}

	public findUser = async ( id: string ) => {
		return ( this.users$.getValue() || [] ).find( user => user.id === id );
	}
}
