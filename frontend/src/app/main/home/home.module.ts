import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [{ path: '', component: ContentComponent }],
	},
];

@NgModule({
	declarations: [
		HomeComponent,
		NavBarComponent,
		ContainerComponent,
		ContentComponent,
	],
	imports: [CommonModule, RouterModule.forChild(routes), ButtonModule],
})
export class HomeModule {}
