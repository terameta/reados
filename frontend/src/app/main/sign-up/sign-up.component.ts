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
		this.httpClient.post('/func-client-sign-up', form.value).subscribe({
			next: (data) => {
				console.log('Next', data);
			},
			error: (error) => {
				console.log(error);
				console.log(error.error);
			},
			complete: () => {
				console.log('Complete');
			},
		});
	};
}
