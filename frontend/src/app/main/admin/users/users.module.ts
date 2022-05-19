import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: '', component: UsersComponent },
];

@NgModule( {
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
    // TableModule,
  ]
} )
export class UsersModule { }
