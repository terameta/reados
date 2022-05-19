import { Component, OnInit } from '@angular/core';
import { User } from '@typedefs/user';
import { UsersService } from 'src/app/services/users.service';

@Component( {
	selector: 'app-users',
	template: `
		<p-table [value]="(usersService.users$ | async) || []">
			<ng-template pTemplate="header">
				<tr>
					<th>Name</th>
					<th>User Name</th>
					<th>Type</th>
					<th class="text-right">Since</th>
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

	public users: User[] = [];

	constructor( public usersService: UsersService ) { }

	ngOnInit (): void {
	}

}
