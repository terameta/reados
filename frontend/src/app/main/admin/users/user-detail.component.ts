import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@typedefs/user';
import { UsersService } from 'src/app/services/users.service';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component( {
	selector: 'app-user-detail',
	template: `
		<form *ngIf="user" [formGroup]="userForm">
		<p-card>
			<ng-template pTemplate="title" class="bg-primary">Editing: {{ user.displayName || user.email }}</ng-template>
			<div class="grid">
				<div class="col-12 md:col-6 xl:col-3">
					<p-card>
						<ng-template pTemplate="header">
							<div class="bg-blue-200 w-full px-3 py-2 font-bold">Main Definitions</div>
						</ng-template>
						<div class="field grid mb-2">
							<label for="email" class="col-fixed font-bold" style="width:120px">Username:</label>
							<div class="col">
								<input type="email" pInputText name="email" formControlName="email" class="w-full" appAutoFocus>
							</div>
						</div>
						<div class="field grid mb-2">
							<label for="fname" class="col-fixed font-bold" style="width:120px">First Name:</label>
							<div class="col">
								<input type="text" pInputText name="fName" formControlName="firstName" class="w-full">
							</div>
						</div>
						<div class="field grid mb-2">
							<label for="mName" class="col-fixed font-bold" style="width:120px">Middle Name:</label>
							<div class="col">
								<input type="text" pInputText name="mName" formControlName="middleName" class="w-full">
							</div>
						</div>
						<div class="field grid mb-0">
							<label for="lName" class="col-fixed font-bold" style="width:120px">Last Name:</label>
							<div class="col">
								<input type="text" pInputText name="lName" formControlName="lastName" class="w-full">
							</div>
						</div>
					</p-card>
				</div>
				<div class="col-12 md:col-6 xl:col-3">
					<p-card>
						<ng-template pTemplate="header">
							<div class="bg-blue-200 w-full px-3 py-2 font-bold flex">
								Phones:
								<fa-icon [icon]="faCirclePlus" class="ml-auto pointer" (click)="addPhone()"></fa-icon>
							</div>
						</ng-template>
						<ng-container *ngIf="!phones.controls.length">
							There are no phone numbers saved yet. Please add using the button above.
						</ng-container>
						<ng-container *ngIf="phones.controls.length">
							<div class="grid">
								<div class="col-fixed" style="width: 100px;">Type</div>
								<div class="col">Number</div>
							</div>
						</ng-container>
						<ng-container formArrayName="phones">
							<ng-container *ngFor="let upf of phones.controls; let index = index;">
								<div [formGroupName]="index">
									<div class="p-inputgroup mb-2">
										<select formControlName="type" class="col-fixed" style="width:100px; border-right: 0;">
											<option disabled>Please select</option>
											<option value="mobile">Mobile</option>
											<option value="landline">Landline</option>
										</select>
										<input type="number" pInputText formControlName="number" class="w-full">
									</div>
								</div>
							</ng-container>
						</ng-container>
						<!-- <ng-container formArrayName="phones"> -->
							<!-- <ng-container *ngFor="let upf of phones.controls; let index = index"> -->
								<!-- <ng-container formGroupName="index"> -->
									<!-- <div class="p-inputgroup">
										<input type="text" name="pType{{i}}" formControlName="type">
									</div> -->
								<!-- </ng-container> -->
							<!-- </ng-container> -->
						<!-- </ng-container> -->
					</p-card>
				</div>
				<div class="col-12 md:col-6 xl:col-3">
					<pre>{{ userForm.value | json }}</pre>
				</div>
			</div>
			
			<pre>{{ user | json }}</pre>
			<ng-template pTemplate="footer">
				<span class="w-full flex">
					<button pButton type="button" class="p-button-secondary p-button-sm ml-auto p-button-raised" (click)="router.navigate(['admin','users'])">
						<fa-icon [icon]="faBackward" class="mr-3"></fa-icon>
						Back
					</button>
					<button pButton type="submit" class="p-button-success p-button-sm ml-3 p-button-raised" [disabled]="userForm.invalid">
						<fa-icon [icon]="faFloppyDisk" class="mr-3"></fa-icon>
						Save
					</button>
				</span>
			</ng-template>
		</p-card>
		</form>
		<p-card *ngIf="!user">
			<fa-icon [icon]="faCircleNotch" [spin]="true" class="mr-5"></fa-icon>
			Loading, please wait
		</p-card>
  `,
	styles: [
	]
} )
export class UserDetailComponent implements OnInit {

	public faCircleNotch = faCircleNotch;
	public faFloppyDisk = faFloppyDisk;
	public faBackward = faBackward;
	public faCirclePlus = faCirclePlus;

	public user: User | null = null;
	public id: string = this.route.snapshot.params[ 'id' ];

	constructor( private userService: UsersService, private route: ActivatedRoute, public router: Router, private fb: FormBuilder ) { }

	public userForm = this.fb.group( {
		email: [ this.user?.email, [ Validators.required, Validators.email ] ],
		firstName: [ this.user?.firstName, [ Validators.required ] ],
		middleName: [ this.user?.middleName ],
		lastName: [ this.user?.lastName, [ Validators.required ] ],
		phones: this.fb.array( [] )
	} );

	public phoneTypes = [ { name: 'Mobile', value: 'mobile' }, { name: 'Landline', value: 'landline' } ];
	public phones: FormArray = this.fb.array( [] );

	public addPhone = () => {
		this.phones = this.userForm.get( 'phones' ) as FormArray;
		this.phones.push( this.fb.group( {
			type: [ '', [ Validators.required ] ],
			number: [ '', [ Validators.required ] ],
		} ) );
	}

	ngOnInit (): void {
		this.initiate();
	}

	private initiate = async () => {
		this.user = await this.userService.getUser( this.id ) || null;
		if ( this.user ) this.userForm.patchValue( this.user, { emitEvent: false } );
	}

}
