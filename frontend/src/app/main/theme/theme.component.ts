import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-theme',
	templateUrl: './theme.component.html',
	styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
	public faCog = faCog;

	constructor() {}

	ngOnInit(): void {}
}
