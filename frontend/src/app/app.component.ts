import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'reados';
	constructor(private authService: AuthService) {}
}
