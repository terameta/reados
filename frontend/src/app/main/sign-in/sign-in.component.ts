import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { globalSettings } from '@globals/settings';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/auth.service';

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

	constructor( private httpClient: HttpClient, private messageService: MessageService, private authService: AuthService, private router: Router ) { }

	ngOnInit (): void {
		if ( this.authService.isAuthenticated ) {
			this.router.navigate( [ '/' ] );
		}
	}

	public onSubmit = async (): Promise<void> => {
		this.isSubmitting = true;
		await this.authService.signIn( this.customer.value.email, this.customer.value.password );
		this.isSubmitting = false;
	};
}
