import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from './core/auth.service';
@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	providers: [ MessageService ]
} )
export class AppComponent {
	title = 'reados';
	constructor( private authService: AuthService, private pConfig: PrimeNGConfig, private messageService: MessageService ) {
		this.pConfig.ripple = true;
	}
}
