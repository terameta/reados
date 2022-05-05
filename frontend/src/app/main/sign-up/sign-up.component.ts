import { Component, OnInit } from '@angular/core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	public faKey = faKey;

	constructor(private httpClient: HttpClient) {}

	ngOnInit(): void {}

	public onSubmit = async (form: NgForm): Promise<void> => {
		console.log(form.value);
		const result = await this.httpClient
			.post('/client-sign-up', form.value)
			.toPromise();
		console.log(result);
	};
}
