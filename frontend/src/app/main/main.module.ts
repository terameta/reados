import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from '../directives/auto-focus/auto-focus.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from './container.component';
import { NavBarComponent } from './nav-bar.component';

const routes: Routes = [
	{
		path: '', component: ContainerComponent, children: [
			{ path: 'admin', loadChildren: () => import( './admin/admin.module' ).then( m => m.AdminModule ) },
		]
	},
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-up', component: SignUpComponent },
];

@NgModule( {
	declarations: [
		ContainerComponent,
		NavBarComponent,
		SignInComponent,
		SignUpComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		ReactiveFormsModule,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		AutoFocusModule,
		KeyFilterModule,
		ToastModule,
		FontAwesomeModule,
	],
} )
export class MainModule { }
