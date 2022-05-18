import { Injectable, Inject } from '@angular/core';
import { globalSettings } from '@globals/settings';
import { WINDOW } from './window.providers';
import { Router, Event } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CoreDefinitionsService {
	private docElem: any;
	constructor(
		@Inject(WINDOW) private window: Window,
		@Inject(DOCUMENT) private document: Document,
		private router: Router
	) {
		this.router.events.subscribe(this.routeEventHandler);
		this.docElem = document.documentElement;
	}

	public apiURL = globalSettings.apiURL;

	public currentUrl = '';
	public domain = '';

	private routeEventHandler = (event: Event) => {
		// console.log(event);
		this.currentUrl = this.window.location.host;
		// console.log(this.window.location);
	};

	public isFullScreen = false;

	public toggleFullScreen = () => {
		if (this.isFullScreen) {
			this.stopFullScreen();
		} else {
			this.startFullScreen();
		}
	};

	private startFullScreen = () => {
		if (this.docElem.requestFullscreen) {
			this.docElem.requestFullscreen();
		} else if (this.docElem.mozRequestFullScreen) {
			/* Firefox */
			this.docElem.mozRequestFullScreen();
		} else if (this.docElem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			this.docElem.webkitRequestFullscreen();
		} else if (this.docElem.msRequestFullscreen) {
			/* IE/Edge */
			this.docElem.msRequestFullscreen();
		}
		this.isFullScreen = true;
	};

	private stopFullScreen = () => {
		if (this.document.exitFullscreen) {
			this.document.exitFullscreen();
		} else if ((this.document as any).mozCancelFullScreen) {
			/* Firefox */
			(this.document as any).mozCancelFullScreen();
		} else if ((this.document as any).webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			(this.document as any).webkitExitFullscreen();
		} else if ((this.document as any).msExitFullscreen) {
			/* IE/Edge */
			(this.document as any).msExitFullscreen();
		}
		this.isFullScreen = false;
	};
}

/**
 * import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../window.providers';

@Injectable()
export class SampleService {

    constructor(@Inject(WINDOW) private window: Window) {
    }

    getHostname() : string {
        return this.window.location.hostname;
    }
}
 */
