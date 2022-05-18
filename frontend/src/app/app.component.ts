import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth.service';
@Component( {
	selector: 'app-root',
	template: `
		<p-toast key="main"></p-toast>
		<p-toast key="center" position="center"></p-toast>
		<router-outlet></router-outlet>
	`,
	styles: [ `` ],
} )
export class AppComponent {
	title = 'reados';
	constructor( private authService: AuthService, private pConfig: PrimeNGConfig ) {
		this.pConfig.ripple = true;
	}
}
