import { Component, OnInit } from '@angular/core';
import { CoreDefinitionsService } from 'src/app/core/core-definitions.service';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth.service';

@Component( {
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: [ './nav-bar.component.scss' ],
} )
export class NavBarComponent implements OnInit {

	public faCompress = faCompress;
	public faExpand = faExpand;

	constructor( public coreDefinitionsService: CoreDefinitionsService, public authService: AuthService ) { }

	ngOnInit (): void { }
}
