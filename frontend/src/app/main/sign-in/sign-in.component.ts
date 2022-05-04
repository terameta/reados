import { Component, OnInit } from '@angular/core';
import { faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
	public faKey = faKey;

	constructor() {}

	ngOnInit(): void {}
}