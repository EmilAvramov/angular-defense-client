import { AfterViewInit, Component, OnDestroy } from '@angular/core';
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

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnDestroy, AfterViewInit {
	public completer$: Subject<void> = new Subject<void>();
	public userData$: Observable<User | null> | undefined;

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
		private router: Router
	) {
		this.userFacade.userData$
			.pipe(
				takeUntil(this.completer$),
				map(({ id, email, firstName, lastName, phone, address, city, token }) => {
					this.userId = id;
					this.userEmail = email;
					this.userFirstName = firstName;
					this.userLastName = lastName;
					this.userPhone = phone;
					this.userAddress = address;
					this.userCity = city;
					this.userToken = token;
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
	}

	changePassword() {
		const { password } = this.passwordForm.value;

		this.userFacade.changePassword(
			this.userId,
			password as string,
			this.userToken
		);
	}

	deleteAccount(id: number, token: string) {
		this.userFacade.deleteAccount(id, token);
		this.router.navigate(['/']);
		this.userFacade.logoutUser(token);
	}
}
