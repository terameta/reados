import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public faCog = faCog;
	title = 'reados';
	constructor(private httpClient: HttpClient) {}

	public sendRequestandShow = (): void => {
		console.log('sendRequestandShow');
		https: this.httpClient
			// .get('firstFunction')
			.get('https://fapi.reados.com/api/firstFunction')
			.subscribe((data) => {
				console.log('We received this');
				console.log(data);
			});
	};
}
