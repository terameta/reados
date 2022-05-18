import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component( {
  selector: 'app-users',
  template: `
    <pre>{{ usersService.users$ | async | json }}</pre>
  `,
  styles: [
  ]
} )
export class UsersComponent implements OnInit {

  constructor( public usersService: UsersService ) { }

  ngOnInit (): void {
  }

}
