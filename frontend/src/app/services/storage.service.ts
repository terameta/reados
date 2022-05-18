import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from './window.providers';

@Injectable( { providedIn: 'root' } )
export class StorageService {

  public storage$ = new BehaviorSubject<any>( null );

  constructor( @Inject( WINDOW ) private window: Window ) {
    this.window.addEventListener( 'storage', this.onStorageChange, false );
    this.captureStorage();
  }

  private captureStorage = () => {
    const values: any = {};
    for ( const key of Object.keys( localStorage ) ) {
      values[ key ] = localStorage.getItem( key );
    }
    this.storage$.next( values );
  }


  private onStorageChange = ( event: StorageEvent ) => {
    this.captureStorage();
  }

  public put = async ( itName: string, itValue: string ) => {
    localStorage.setItem( itName, itValue );
    this.captureStorage();
  }

  public get = async ( itName: string ) => {
    return localStorage.getItem( itName );
  }

  public delete = async ( itName: string ) => {
    localStorage.removeItem( itName );
    this.captureStorage();
  }

  public clear = async () => {
    localStorage.clear();
    this.captureStorage();
  }
}
