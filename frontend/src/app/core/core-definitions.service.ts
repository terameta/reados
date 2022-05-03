import { Injectable } from '@angular/core';
import { settings } from '@globals/settings';

@Injectable({
	providedIn: 'root',
})
export class CoreDefinitionsService {
	constructor() {}

	public apiURL = settings.apiURL;
}
