import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from '../directives/auto-focus/auto-focus.module';
import { KeyFilterModule } from 'primeng/keyfilter';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import( './home/home.module' ).then( ( m ) => m.HomeModule ),
	},
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-up', component: SignUpComponent },
];

@NgModule( {
	declarations: [ SignInComponent, SignUpComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		ReactiveFormsModule,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		AutoFocusModule,
		KeyFilterModule,
	],
} )
export class MainModule { }
