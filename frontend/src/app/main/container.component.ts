import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component( {
  selector: 'app-container',
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="content-container">
      <pre>{{ authService.session$ | async | json }}</pre>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
} )
export class ContainerComponent {

  constructor( public authService: AuthService ) { }

}
