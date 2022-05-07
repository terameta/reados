import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalSettings } from '@globals/settings';

@Injectable()
export class MainInterceptorInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const toClone: any = {};
		if (!request.url.startsWith('http')) {
			toClone.url = globalSettings.apiURL;
			if (!request.url.startsWith('/')) toClone.url += '/';
			toClone.url += request.url;
		}

		const updatedRequest = request.clone(toClone);
		console.log(updatedRequest.url);
		return next.handle(updatedRequest);
	}
}
