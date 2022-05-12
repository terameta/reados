import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { globalSettings } from '@globals/settings';
import { Subject } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	switchMap,
	tap,
} from 'rxjs/operators';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	public cardinalDomain = globalSettings.cardinalDomain;
	public systemName = globalSettings.systemName;

	public isSearching = false;

	private domainSubject = new Subject<string>();

	constructor(private httpClient: HttpClient) {}

	ngOnInit(): void {
		this.domainSubject
			.pipe(
				filter((value: string) => value.length > 2),
				distinctUntilChanged(),
				tap(() => {
					this.isSearching = true;
				}),
				debounceTime(1000),
				switchMap((domain) =>
					this.httpClient.post('/func-client-check-domain', { domain })
				)
			)
			.subscribe((result) => {
				console.log(result);
				this.isSearching = false;
			});
	}

	public onSubmit = async (form: NgForm): Promise<void> => {
		this.httpClient.post('/func-client-sign-up', form.value).subscribe({
			next: (data) => {
				console.log('Next', data);
			},
			error: (error) => {
				console.log(error);
				console.log(error.error);
			},
			complete: () => {
				console.log('Complete');
			},
		});
	};

	public domainKeyUp = (event: KeyboardEvent): void => {
		// console.log('Keyup', event.key);
		// console.log( ( event.target as any ).value );
		this.domainSubject.next((event.target as HTMLInputElement).value);
	};
}
