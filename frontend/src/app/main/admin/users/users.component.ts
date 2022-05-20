import { Component, OnInit } from '@angular/core';
import { User } from '@typedefs/user';
import { UsersService } from 'src/app/services/users.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
@Component( {
	selector: 'app-users',
	template: `
		<p-table [value]="(usersService.users$ | async) || []" [scrollable]="true" [virtualScroll]="true" scrollHeight="flex">
			<ng-template pTemplate="header">
				<tr>
					<th>Name</th>
					<th>User Name</th>
					<th>Type</th>
					<th class="text-right">
						Since
						<button pButton pRipple type="button" class="p-button-sm ml-auto bg-green-700 p-button-rounded p-button-icon-only" routerLink="new">
							<fa-icon [icon]="faCirclePlus" class="text-light"></fa-icon>
						</button>
					</th>
				</tr>
			</ng-template>
			<ng-template pTemplate="body" let-user>
				<tr>
					<td>
						<a [routerLink]="user.id">
							{{ user.displayName || 'No name provided'}}
						</a>
					</td>
					<td>{{ user.email }}</td>
					<td>{{ user.type }}</td>
					<td class="text-mono text-right">{{ user.createdAt }}</td>
				</tr>
			</ng-template>
		</p-table>
		<!-- <pre>{{ usersService.users$ | async | json }}</pre> -->
	`,
	styles: [
	]
} )
export class UsersComponent implements OnInit {

	public faCirclePlus = faCirclePlus;

	public users: User[] = [];

	constructor( public usersService: UsersService ) { }

	ngOnInit (): void {
	}

}
