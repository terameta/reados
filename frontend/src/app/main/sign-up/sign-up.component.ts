import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { globalSettings } from '@globals/settings';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

@Component( {
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: [ './sign-up.component.scss' ],
} )
export class SignUpComponent implements OnInit {
	public cardinalDomain = globalSettings.cardinalDomain;
	public systemName = globalSettings.systemName;

	public isSearching = false;


	public client: FormGroup = new FormGroup( {
		domain: new FormControl( '', [ Validators.required, Validators.minLength( 3 ) ] ),
		email: new FormControl( '', [ Validators.required, Validators.email ] ),
		password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ) ] ),
	} );

	get domain () { return this.client.get( 'domain' ); }
	get email () { return this.client.get( 'email' ); }
	get password () { return this.client.get( 'password' ); }

	constructor( private httpClient: HttpClient ) { }

	ngOnInit (): void {
		this.client.controls[ 'domain' ].valueChanges.
			pipe(
				filter( ( value: string ) => value.length > 2 ),
				distinctUntilChanged(),
				tap( () => {
					this.isSearching = true;
				} ),
				debounceTime( 1000 ),
				switchMap( ( domain ) =>
					this.httpClient.post( '/func-client-check-domain', { domain } )
				)
			).
			subscribe( ( result: any ) => {
				console.log( result );
				this.isSearching = false;
				if ( result.result !== 'available' ) {
					this.client.controls[ 'domain' ].setErrors( { ...this.client.controls[ 'domain' ].errors, taken: true } );
				} else {
					this.client.controls[ 'domain' ].setErrors( null );
				}
			} );
	}

	public onSubmit = async (/*form: NgForm*/ ): Promise<void> => {
		// this.httpClient.post('/func-client-sign-up', form.value).subscribe({
		// 	next: (data) => {
		// 		console.log('Next', data);
		// 	},
		// 	error: (error) => {
		// 		console.log(error);
		// 		console.log(error.error);
		// 	},
		// 	complete: () => {
		// 		console.log('Complete');
		// 	},
		// });
	};
}
