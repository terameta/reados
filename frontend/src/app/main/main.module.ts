import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-up', component: SignUpComponent },
];

@NgModule({
	declarations: [SignInComponent, SignUpComponent],
	imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class MainModule {}
