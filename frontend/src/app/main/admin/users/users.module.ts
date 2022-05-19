import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDetailComponent } from './user-detail.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'src/app/directives/auto-focus/auto-focus.module';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
	{ path: '', component: UsersComponent },
	{ path: ':id', component: UserDetailComponent },
];

@NgModule( {
	declarations: [
		UsersComponent,
		UserDetailComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		TableModule,
		CardModule,
		ButtonModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		InputTextModule,
		AutoFocusModule,
		PanelModule,
		DropdownModule,
	]
} )
export class UsersModule { }
