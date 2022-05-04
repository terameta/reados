import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeComponent } from '../theme/theme.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'theme', component: ThemeComponent },
];

@NgModule({
	declarations: [HomeComponent, NavBarComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FontAwesomeModule,
		TooltipModule.forRoot(),
	],
})
export class HomeModule {}
