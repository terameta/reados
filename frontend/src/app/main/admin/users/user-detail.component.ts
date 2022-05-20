import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@typedefs/user';
import { UsersService } from 'src/app/services/users.service';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component( {
	selector: 'app-user-detail',
	template: `
		<form *ngIf="user" [formGroup]="userForm" (ngSubmit)="onSubmit()">
		<p-card>
			<ng-template pTemplate="title" class="bg-primary">Editing: {{ user.displayName || user.email }}</ng-template>
			<div class="grid" style="height: calc(100vh - 178px);overflow: scroll;">
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
										<input type="text" pInputText formControlName="number" class="w-full" pKeyFilter="pnum">
										<button pButton pRipple type="button" (click)="deletePhone(index)">
											<fa-icon [icon]="faTrash"></fa-icon>
										</button>
									</div>
								</div>
							</ng-container>
						</ng-container>
					</p-card>
				</div>
				<div class="col-12 md:col-6 xl:col-3">
					<p-card>
						<ng-template pTemplate="header">
							<div class="bg-blue-200 w-full px-3 py-2 font-bold flex">
								Emails:
								<fa-icon [icon]="faCirclePlus" class="ml-auto pointer" (click)="addEmail()"></fa-icon>
							</div>
						</ng-template>
						<ng-container *ngIf="!emails.controls.length">
							There are no email addresses saved yet. Please add using the button above.
						</ng-container>
						<ng-container formArrayName="emails">
							<ng-container *ngFor="let upf of emails.controls; let index = index;">
								<div class="p-inputgroup mb-2 w-full">
									<input type="text" pInputText [formControlName]="index">
									<button pButton pRipple type="button" (click)="deleteEmail(index)">
										<fa-icon [icon]="faTrash" class="text-light"></fa-icon>
									</button>
								</div>
							</ng-container>
						</ng-container>
					</p-card>
				</div>
				<div class="col-12 md:col-6 xl:col-3">
					<p-card>
						<ng-template pTemplate="header">
							<div class="bg-blue-200 w-full px-3 py-2 font-bold flex">
								Addresses:
								<fa-icon [icon]="faCirclePlus" class="ml-auto pointer" (click)="addAddress()"></fa-icon>
							</div>
						</ng-template>
						<ng-container *ngIf="!addresses.controls.length">
							There are no addresses saved yet. Please add using the button above.
						</ng-container>
						<ng-container formArrayName="addresses">
							<ng-container *ngFor="let upf of addresses.controls; let index = index;">
								<div class="p-inputgroup mb-2 w-full">
									<textarea pInputText [formControlName]="index"></textarea>
									<button pButton pRipple type="button" (click)="deleteAddress(index)">
										<fa-icon [icon]="faTrash" class="text-light"></fa-icon>
									</button>
								</div>
							</ng-container>
						</ng-container>
					</p-card>
				</div>
			</div>
			<ng-template pTemplate="footer">
				<span class="w-full flex">
					<button pButton type="button" class="p-button-secondary p-button-sm ml-auto p-button-raised" (click)="router.navigate(['admin','users'])">
						<fa-icon [icon]="faBackward" class="mr-3"></fa-icon>
						Back
					</button>
					<button pButton type="button" class="p-button-danger p-button-sm ml-3 p-button-raised" (click)="deleteUser()" *ngIf="id !== 'new'">
						<fa-icon [icon]="faTrash" class="mr-3"></fa-icon>
						Delete
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
		<p-confirmDialog header="Confirmation" icon="pi pi-exclamation-triangle"></p-confirmDialog>
  `,
	styles: [
	]
} )
export class UserDetailComponent implements OnInit {

	public faCircleNotch = faCircleNotch;
	public faFloppyDisk = faFloppyDisk;
	public faBackward = faBackward;
	public faCirclePlus = faCirclePlus;
	public faTrash = faTrash;

	public isSubmitting = false;

	public user: User | null = null;
	public id: string = this.route.snapshot.params[ 'id' ];

	constructor(
		public userService: UsersService,
		public router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
	) { }

	public userForm = this.fb.group( {
		email: [ this.user?.email, [ Validators.required, Validators.email ] ],
		firstName: [ this.user?.firstName, [ Validators.required ] ],
		middleName: [ this.user?.middleName ],
		lastName: [ this.user?.lastName, [ Validators.required ] ],
		phones: this.fb.array( [] ),
		emails: this.fb.array( [] ),
		addresses: this.fb.array( [] ),
	} );

	public phoneTypes = [ { name: 'Mobile', value: 'mobile' }, { name: 'Landline', value: 'landline' } ];
	public phones: FormArray = this.fb.array( [] );
	public emails: FormArray = this.fb.array( [] );
	public addresses: FormArray = this.fb.array( [] );

	public addPhone = () => {
		this.phones = this.userForm.get( 'phones' ) as FormArray;
		this.phones.push( this.fb.group( {
			type: [ '', [ Validators.required ] ],
			number: [ '', [ Validators.required ] ],
		} ) );
	}

	public deletePhone = ( index: number ) => {
		this.phones.removeAt( index );
	}

	public addEmail = () => {
		this.emails = this.userForm.get( 'emails' ) as FormArray;
		this.emails.push( this.fb.control( '', [ Validators.required, Validators.email ] ) );
	}

	public deleteEmail = ( index: number ) => {
		this.emails.removeAt( index );
	}

	public addAddress = () => {
		this.addresses = this.userForm.get( 'addresses' ) as FormArray;
		this.addresses.push( this.fb.control( '', [ Validators.required ] ) );
	}

	public deleteAddress = ( index: number ) => {
		this.addresses.removeAt( index );
	}

	ngOnInit (): void {
		this.initiate();
	}

	private initiate = async () => {
		if ( this.id === 'new' ) {
			this.user = {} as User;
		} else {
			this.user = await this.userService.getUser( this.id ) || null;
			if ( this.user ) {
				for ( const p of this.user.phones || [] ) { this.addPhone(); }
				for ( const p of this.user.emails || [] ) { this.addEmail(); }
				for ( const p of this.user.addresses || [] ) { this.addAddress(); }
				this.userForm.patchValue( this.user, { emitEvent: false } );
				// this.phones.setValue( this.user.phones, { emitEvent: false } );
			}
		}
	}

	public onSubmit = async (): Promise<void> => {
		this.isSubmitting = true;
		try {
			if ( this.id !== 'new' ) {
				await this.userService.putUser( { ...this.user, ...this.userForm.value } );
			} else {
				await this.userService.postUser( { ...this.user, ...this.userForm.value } );
			}
			this.messageService.add( { severity: 'success', summary: 'User is saved.', key: 'main' } );

		} catch ( error: any ) {
			console.error( error );
			this.messageService.add( { severity: 'error', summary: 'Failed to save', detail: error.message || 'Server error, please try again later', key: 'center', sticky: true } );
		} finally {
			this.isSubmitting = false;
		}
	}

	public deleteUser = async () => {
		this.confirmationService.confirm( {
			message: 'Are you sure you want to delete this user?',
			accept: () => {
				this.userService.deleteUser( this.id );
			}
		} );
	}

}
