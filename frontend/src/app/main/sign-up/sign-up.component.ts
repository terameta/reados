import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { globalSettings } from '@globals/settings';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import isStrongPassword from 'validator/lib/isStrongPassword';

@Component( {
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: [ './sign-up.component.scss' ],
} )
export class SignUpComponent implements OnInit {

	public systemName = globalSettings.systemName;

	public isPasswordClear = false;
	public isSubmitting = false;

	private createPasswordStrengthValidator = (): ValidatorFn => {
		return ( control: AbstractControl ): ValidationErrors | null => {

			const value = control.value;

			if ( !value ) {
				return null;
			}

			return isStrongPassword( value, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			} ) ? null : { weakPassword: true };

		}
	}

	public customer: FormGroup = new FormGroup( {
		email: new FormControl( '', [ Validators.required, Validators.email ] ),
		password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), this.createPasswordStrengthValidator() ] ),
	} );

	get email () { return this.customer.get( 'email' ); }
	get password () { return this.customer.get( 'password' ); }

	constructor( private httpClient: HttpClient ) { }

	ngOnInit (): void { }

	public onSubmit = async (): Promise<void> => {
		this.isSubmitting = true;
		this.httpClient.post( '/func-customer-sign-up', this.customer.value ).subscribe( {
			next: ( data ) => {
				console.log( 'Next', data );
			},
			error: ( error ) => {
				console.log( error );
				console.log( error.error );
			},
			complete: () => {
				this.isSubmitting = false;
			},
		} );
	};

}
