import { Component, OnInit } from '@angular/core';
import { CoreDefinitionsService } from 'src/app/core/core-definitions.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
	constructor(public coreDefinitionsService: CoreDefinitionsService) {}

	ngOnInit(): void {}
}
