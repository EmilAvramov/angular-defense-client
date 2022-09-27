import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import {
	emailPattern,
	passwordPattern,
	phonePattern,
} from 'src/app/shared/variables/validationPatterns';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/core/confirm/confirm.component';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit, AfterViewInit, OnDestroy {
	public completer$: Subject<void> = new Subject<void>();
	public userData$: Observable<User>;

	public userId!: number;
	public userEmail!: string;
	public userFirstName!: string;
	public userLastName!: string;
	public userPhone!: string;
	public userAddress!: string;
	public userCity!: string;
	public userToken!: string;

	constructor(
		private fb: FormBuilder,
		private userFacade: UserFacade,
		private router: Router,
		private cdr: ChangeDetectorRef,
		public dialog: MatDialog
	) {
		this.userData$ = this.userFacade.userData$;
	}
	ngOnInit(): void {
		this.userData$
			.pipe(
				takeUntil(this.completer$),
				map((user: User) => {
					this.userId = user.id;
					this.userEmail = user.email;
					this.userFirstName = user.firstName;
					this.userLastName = user.lastName;
					this.userPhone = user.phone;
					this.userAddress = user.address;
					this.userCity = user.city;
					this.userToken = user.token;
				})
			)
			.subscribe();
	}

	ngAfterViewInit(): void {
		this.profileForm.patchValue({
			email: this.userEmail,
			firstName: this.userFirstName,
			lastName: this.userLastName,
			phone: this.userPhone,
			address: this.userAddress,
			city: this.userCity,
		});
		this.cdr.detectChanges();
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

	passwordValidation(
		firstControl: string,
		secondControl: string,
		thirdControl: string
	) {
		return (formGroup: FormGroup) => {
			const first = formGroup.controls[firstControl];
			const second = formGroup.controls[secondControl];
			const third = formGroup.controls[thirdControl];

			if (second.value !== third.value) {
				third.setErrors({ mismatch: true });
			} else if (first.value === third.value) {
				third.setErrors({ identical: true });
			} else {
				third.setErrors(null);
			}
		};
	}

	deleteValidation(controlName: string) {
		return (formGroup: FormGroup) => {
			const control = formGroup.controls[controlName];

			if (control.value !== 'I confirm to delete my account') {
				control.setErrors({ mismatch: true });
			} else {
				control.setErrors(null);
			}
		};
	}

	profileForm = this.fb.group({
		email: [
			'',
			{
				validators: [Validators.required, Validators.pattern(emailPattern)],
				updateOn: 'blur',
			},
		],
		firstName: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'blur',
			},
		],
		lastName: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'blur',
			},
		],
		phone: [
			'',
			{
				validators: [Validators.required, Validators.pattern(phonePattern)],
				updateOn: 'blur',
			},
		],
		address: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'blur',
			},
		],
		city: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'change',
			},
		],
	});

	passwordForm = this.fb.group(
		{
			currentPassword: [
				'',
				{
					validators: [Validators.required, Validators.pattern(passwordPattern)],
					updateOn: 'blur',
				},
			],
			password: [
				'',
				{
					validators: [Validators.required, Validators.pattern(passwordPattern)],
					updateOn: 'blur',
				},
			],
			passwordRe: [
				'',
				{
					validators: [Validators.required, Validators.pattern(passwordPattern)],
					updateOn: 'change',
				},
			],
		},
		{
			validator: this.passwordValidation(
				'currentPassword',
				'password',
				'passwordRe'
			),
		}
	);

	deleteForm = this.fb.group(
		{
			confirm: [
				'',
				{
					validators: [Validators.required],
					updateOn: 'change',
				},
			],
		},
		{
			validator: this.deleteValidation('confirm'),
		}
	);

	get email() {
		return this.profileForm.get('email');
	}
	get firstName() {
		return this.profileForm.get('firstName');
	}
	get lastName() {
		return this.profileForm.get('lastName');
	}
	get phone() {
		return this.profileForm.get('phone');
	}
	get address() {
		return this.profileForm.get('address');
	}
	get city() {
		return this.profileForm.get('city');
	}
	get currentPassword() {
		return this.passwordForm.get('currentPassword');
	}
	get password() {
		return this.passwordForm.get('password');
	}
	get passwordRe() {
		return this.passwordForm.get('passwordRe');
	}
	get confirm() {
		return this.deleteForm.get('confirm');
	}

	changeDetails() {
		const { email, firstName, lastName, phone, address, city } =
			this.profileForm.value;
		this.userFacade.changeDetails(
			this.userId,
			email as string,
			firstName as string,
			lastName as string,
			phone as string,
			address as string,
			city as string,
			this.userToken
		);
		this.router.navigate(['/login']);
		this.userFacade.logoutUser(this.userToken);
	}

	changePassword() {
		const { password } = this.passwordForm.value;

		this.userFacade.changePassword(
			this.userId,
			password as string,
			this.userToken
		);

		this.router.navigate(['/login']);
		this.userFacade.logoutUser(this.userToken);
	}

	deleteAccount() {
		const dialogRef: MatDialogRef<ConfirmDialog> = this.dialog.open(
			ConfirmDialog,
			{
				disableClose: false,
				width: '40vw',
				height: '21vh',
				data: {
					message:
						'Are you sure you want to delete your account? This cannot be undone.',
					ok: 'Yes, continue',
					cancel: 'No, cancel',
				},
			}
		);
		dialogRef
			.afterClosed()
			.pipe(
				map((result: boolean) => {
					if (result) {
						this.userFacade.deleteAccount(this.userId, this.userToken);
						this.router.navigate(['/']);
						this.userFacade.logoutUser(this.userToken);
					} else {
						this.deleteForm.reset();
					}
				})
			)
			.subscribe();
	}
}
