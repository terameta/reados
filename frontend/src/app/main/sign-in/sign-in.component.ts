import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { globalSettings } from '@globals/settings';
import { MessageService } from 'primeng/api';

@Component( {
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.scss' ],
} )
export class SignInComponent implements OnInit {

	public systemName = globalSettings.systemName;

	public isPasswordClear = false;
	public isSubmitting = false;

	public customer: FormGroup = new FormGroup( {
		email: new FormControl( '', [ Validators.required, Validators.email ] ),
		password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ) ] ),
	} );

	get email () { return this.customer.get( 'email' ); }
	get password () { return this.customer.get( 'password' ); }

	constructor( private httpClient: HttpClient, private messageService: MessageService ) { }

	ngOnInit (): void { }

	public onSubmit = async (): Promise<void> => {
		this.isSubmitting = true;
		this.httpClient.post( '/func-customer-sign-in', this.customer.value ).subscribe( {
			next: ( data ) => {
				console.log( 'Next', data );
				this.isSubmitting = false;
			},
			error: ( error ) => {
				console.log( error );
				console.log( error.error );
				this.isSubmitting = false;
				const detail = error.error?.message || [ 'Server error, please try again later' ];
				this.messageService.add( { severity: 'error', summary: 'Authentication failed', detail, key: 'center', sticky: true } );
			},
		} );
	};
}
