import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@typedefs/user';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

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
}
