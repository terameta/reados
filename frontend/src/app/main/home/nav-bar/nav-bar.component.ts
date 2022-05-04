import { Component, OnInit } from '@angular/core';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { CoreDefinitionsService } from 'src/app/core/core-definitions.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
	public faExpand = faExpand;
	public faCompress = faCompress;

	constructor(public coreDefinitionsService: CoreDefinitionsService) {}

	ngOnInit(): void {}
}
