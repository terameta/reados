import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { getNonNullValue } from '@utilities/misc/waitNonNull';
import { User } from '@typedefs/user';
import { Router } from '@angular/router';

@Injectable( { providedIn: 'root' } )
export class UsersService {

	public users$ = new BehaviorSubject<User[] | null>( null );

	constructor( private httpClient: HttpClient, private router: Router ) {
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

	public putUser = async ( user: User ) => {
		const result = await lastValueFrom( this.httpClient.put<User>( '/func-user-put', user ) );
		this.refreshUsers();
	}

	public postUser = async ( user: User ) => {
		const result = await lastValueFrom( this.httpClient.post<User>( '/func-user-post', user ) );
		console.log( result );
		this.router.navigate( [ 'admin', 'users', result.id ] );
		this.refreshUsers();
	}

	public deleteUser = async ( id: string ) => {
		const result = await lastValueFrom( this.httpClient.delete<User>( `/func-user-delete/${ id }` ) );
		console.log( result );
		this.router.navigate( [ 'admin', 'users' ] );
		this.refreshUsers();
	}
}
