import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { globalSettings } from '@globals/settings';
import { filter, takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
// import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';

@Component( {
	selector: 'app-sign-in',
	template: `
		<div class="container">
			<div style="padding: 4rem 12rem;" class="font-bold text-4xl">
				<a routerLink="/" class="flex align-items-center no-underline">
					<img src="/assets/logo/reados32.png" alt="RL" class="mr-3 text-color-secondary">
					<span class="text-white">{{ systemName }}</span>
				</a>
			</div>
			<div class="flex p-0 m-0">
				<main class="text-left m-auto surface-ground grid">
					<div class="col max-w-30rem p-0">
						<form (ngSubmit)="onSubmit()" class="m-6 flex flex-wrap" [formGroup]="customer">
							<h1 class="h3 mb-3 fw-normal text-light w-full">Come on in, we are open</h1>

							<label for="email" class="w-full mt-3">Your Email Address</label>
							<input type="email" pInputText class="w-full" placeholder="name@example.com" formControlName="email" required appAutoFocus>
							<small class="w-full text-right text-red-500" *ngIf="email?.invalid && (email?.touched || email?.dirty)">
								<div *ngIf="email?.errors?.['required']">Email address is required.</div>
								<div *ngIf="email?.errors?.['email']">Please enter a valid email address.</div>
							</small>
							<label for="password" class="w-full mt-3">Your Password</label>
							<div class="p-inputgroup">
								<input type="password" pPassword class="w-full" placeholder="Password" formControlName="password" [feedback]="false" [showPassword]="isPasswordClear" required>
								<button pButton pRipple type="button" (click)="isPasswordClear = !isPasswordClear">
									<fa-icon [icon]="isPasswordClear ? faEyeSlash : faEye" class="text-light"></fa-icon>
								</button>
							</div>
							<small class="w-full text-right text-red-500" *ngIf="password?.invalid && (password?.touched || password?.dirty)">
								<div *ngIf="password?.errors">Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.</div>
							</small>

							<br>
							<button pButton type="submit" class="ml-auto bg-primary mt-3" [disabled]="customer.invalid || isSubmitting">
								<fa-icon class="text-light mr-1" [icon]="faKey" [fixedWidth]="true"></fa-icon>
								Sign in
							</button>
						</form>
					</div>
					<div class="col max-w-30rem p-0 hidden md:block">
						<img src="/assets/background/login-side.jpg" alt="Come in, we are open" class="w-full h-full p-0 m-0" width="640" height="943">
					</div>
				</main>
			</div>
		</div>
	`,
	styles: [
		`
			.container {
				background-clip: border-box;
				background: url('/assets/background/image-bg.svg') no-repeat center center fixed;
				background-origin: padding-box;
				background-position-x: 0%;
				background-position-y: 0%;
				background-repeat: no-repeat;
				background-size: cover;
				padding: 0;
				margin: 0;
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				overflow: scroll;
			}
		`
	],
} )
export class SignInComponent implements OnInit {

	public faEye = faEye;
	public faEyeSlash = faEyeSlash;
	public faKey = faKey;

	public systemName = globalSettings.systemName;

	public isPasswordClear = false;
	public isSubmitting = false;

	public customer: FormGroup = new FormGroup( {
		email: new FormControl( '', [ Validators.required, Validators.email ] ),
		password: new FormControl( '', [ Validators.required, Validators.minLength( 8 ) ] ),
	} );

	get email () { return this.customer.get( 'email' ); }
	get password () { return this.customer.get( 'password' ); }

	constructor( private authService: AuthService, private router: Router ) { }

	ngOnInit (): void {
		this.authService.isAuthenticated$.
			pipe(
				takeWhile( ( isAuthenticated ) => isAuthenticated !== false ),
				filter( ( isAuthenticated ) => isAuthenticated === true ),
			).
			subscribe( {
				next: () => {
					this.router.navigate( [ '/' ] );
				}
			} );
	}

	public onSubmit = async (): Promise<void> => {
		this.isSubmitting = true;
		await this.authService.signIn( this.customer.value.email, this.customer.value.password );
		this.isSubmitting = false;
	};
}
