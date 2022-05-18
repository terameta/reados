import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@typedefs/user';
import { BehaviorSubject } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class UsersService {

  public users$ = new BehaviorSubject<User[] | null>( null );

  constructor( private httpClient: HttpClient ) { }
}
