import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeComponent } from '../theme/theme.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'theme', component: ThemeComponent },
];

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
