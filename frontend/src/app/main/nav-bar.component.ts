import { Component } from '@angular/core';
import { CoreDefinitionsService } from 'src/app/services/core-definitions.service';
// import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { AuthService } from 'src/app/services/auth.service';

@Component( {
	selector: 'app-nav-bar',
	template: `
		<nav class="fixed top-0 left-0 w-full font-bold shadow-2">
			<div class="flex align-items-center py-2 px-3">
				<a class="font-bold flex align-items-center no-underline text-3xl" [routerLink]="(authService.session$ | async)?.user?.type === 'admin' ? '/admin' : '/'">
					<img src="/assets/logo/reados24.png" alt="RL" class="mr-3 text-color-secondary">
					<span class="text-color">READOS</span>
				</a>
				<span class="ml-5" *ngIf="(authService.session$ | async)?.user?.type === 'admin'">
					<a class="no-underline text-color mr-3" routerLink="/admin/tickets" routerLinkActive="border-bottom-3 border-black">Tickets</a>
					<a class="no-underline text-color mr-3" routerLink="/admin/users" routerLinkActive="border-bottom-3 border-black">Users</a>
					<a class="no-underline text-color mr-3" routerLink="/admin/customers" routerLinkActive="border-bottom-3 border-black">Companies & Customers</a>
				</span>
				<span class="ml-auto">
					<ng-container *ngIf="!(authService.isAuthenticated$ | async)">
						<a class="no-underline text-color mr-3" routerLink="sign-in" routerLinkActive="border-bottom-3 border-black">
							Sign In
						</a>
						<a class="text-color no-underline" routerLink="sign-up" routerLinkActive="border-bottom-3 border-black">
							Sign Up
						</a>
					</ng-container>
					<ng-container *ngIf="authService.isAuthenticated$ | async">
						<a class="no-underline text-color mr-3" routerLink="profile" routerLinkActive="border-bottom-3 border-black">
							Profile
						</a>
						<a class="text-color no-underline pointer" (click)="authService.signOut()">
							Sign Out
						</a>
					</ng-container>
				</span>
				<button type="button" pButton class="p-button-text text-color" (click)="coreDefinitionsService.toggleFullScreen()">
					<fa-icon [icon]="coreDefinitionsService.isFullScreen ? faCompress : faExpand" [fixedWidth]="true"></fa-icon>
				</button>
			</div>
		</nav>
	`,
	styles: [],
} )
export class NavBarComponent {

	public faCompress = faCompress;
	public faExpand = faExpand;

	constructor( public coreDefinitionsService: CoreDefinitionsService, public authService: AuthService ) { }
}
