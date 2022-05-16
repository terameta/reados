import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptorInterceptor } from './core/main-interceptor.interceptor';
import { WINDOW_PROVIDERS } from './core/window.providers';
import { RippleModule } from 'primeng/ripple';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';

@NgModule( {
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
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
	],
	bootstrap: [ AppComponent ],
} )
export class AppModule { }
