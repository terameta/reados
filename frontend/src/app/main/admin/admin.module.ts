import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'users', loadChildren: () => import( './users/users.module' ).then( m => m.UsersModule ) },
];

@NgModule( {
  declarations: [
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
  ]
} )
export class AdminModule { }
