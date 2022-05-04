import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
	{ path: 'sign-in', component: SignInComponent },
];

@NgModule({
	declarations: [SignInComponent],
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MainModule {}
