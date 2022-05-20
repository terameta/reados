import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptorInterceptor } from './services/main-interceptor.interceptor';
import { WINDOW_PROVIDERS } from './services/window.providers';
import { RippleModule } from 'primeng/ripple';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
	{ path: '', loadChildren: () => import( './main/main.module' ).then( ( m ) => m.MainModule ), },
];

@NgModule( {
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		RouterModule.forRoot( routes ),
		BrowserAnimationsModule,
		HttpClientModule,
		JwtModule.forRoot( { config: { tokenGetter: () => localStorage.getItem( 'token' ) } } ),
		RippleModule,
		ToastModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MainInterceptorInterceptor,
			multi: true,
		},
		WINDOW_PROVIDERS,
		MessageService,
		ConfirmationService,
	],
	bootstrap: [ AppComponent ],
} )
export class AppModule { }
