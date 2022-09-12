import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
export class SettingsComponent implements OnDestroy {
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
				map(({ id, firstName, lastName, phone, address, city, token }) => {
					this.userId = id;
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

	passwordForm = this.fb.group({
		currentPassword: [
			'',
			{
				validators: [Validators.required, Validators.pattern(passwordPattern)],
				updateOn: 'blur',
			},
		],
		newPassword: [
			'',
			{
				validators: [Validators.required, Validators.pattern(passwordPattern)],
				updateOn: 'blur',
			},
		],
		newPasswordRe: [
			'',
			{
				validators: [Validators.required, Validators.pattern(passwordPattern)],
				updateOn: 'change',
			},
		],
	});

	deleteForm = this.fb.group({
		confirm: [
			'',
			{
				validators: [Validators.required],
				updateOn: 'change',
			},
		],
	});

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
	get newPassword() {
		return this.passwordForm.get('newPassword');
	}
	get newPasswordRe() {
		return this.passwordForm.get('newPasswordRe');
	}

	changeDetails() {
		const { email, firstName, lastName, phone, address, city } =
			this.profileForm.value;
	}

	changePassword() {
		const { newPassword } = this.passwordForm.value;
	}

	deleteAccount(id: number, token: string) {
		this.userFacade.deleteAccount(id, token);
		this.router.navigate(['/']);
		this.userFacade.logoutUser(token);
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
