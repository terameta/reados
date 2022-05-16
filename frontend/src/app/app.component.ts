import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './core/auth.service';
@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
} )
export class AppComponent {
	title = 'reados';
	constructor( private authService: AuthService, private pConfig: PrimeNGConfig ) {
		this.pConfig.ripple = true;
	}
}
