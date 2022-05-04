import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeComponent } from '../theme/theme.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: '', component: ContentComponent },
			{ path: 'theme', component: ThemeComponent },
		],
	},
];

@NgModule({
	declarations: [
		HomeComponent,
		NavBarComponent,
		ContainerComponent,
		ContentComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FontAwesomeModule,
		TooltipModule.forRoot(),
	],
})
export class HomeModule {}
