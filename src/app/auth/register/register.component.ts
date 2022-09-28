import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
	emailPattern,
	passwordPattern,
	phonePattern,
} from 'src/app/shared/variables/validationPatterns';
import { Router } from '@angular/router';
import { UserFacade } from 'src/app/state/user/user.facade';
import { Subject, Observable, takeUntil, map } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnDestroy {
	public completer$: Subject<void> = new Subject<void>();

	public error$: Observable<string | null>;
	public loading$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userFacade: UserFacade
	) {
		this.error$ = this.userFacade.userError$;
		this.loading$ = this.userFacade.userLoaded$;
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

	profileForm = this.fb.group({
		credentials: this.fb.group({
			email: [
				'',
				{
					validators: [Validators.required, Validators.pattern(emailPattern)],
					updateOn: 'change',
				},
			],
			password: [
				'',
				{
					validators: [Validators.required, Validators.pattern(passwordPattern)],
					updateOn: 'change',
				},
			],
		}),
		personalDetails: this.fb.group({
			firstName: [
				'',
				{
					validators: [Validators.required],
					updateOn: 'change',
				},
			],
			lastName: [
				'',
				{
					validators: [Validators.required],
					updateOn: 'change',
				},
			],
			phone: [
				'',
				{
					validators: [Validators.required, Validators.pattern(phonePattern)],
					updateOn: 'change',
				},
			],
			address: [
				'',
				{
					validators: [Validators.required],
					updateOn: 'change',
				},
			],
			city: [
				'',
				{
					validators: [Validators.required],
					updateOn: 'change',
				},
			],
		}),
	});

	get email() {
		return this.profileForm.get(['credentials', 'email']);
	}
	get password() {
		return this.profileForm.get(['credentials', 'password']);
	}
	get firstName() {
		return this.profileForm.get(['personalDetails', 'firstName']);
	}
	get lastName() {
		return this.profileForm.get(['personalDetails', 'lastName']);
	}
	get phone() {
		return this.profileForm.get(['personalDetails', 'phone']);
	}
	get address() {
		return this.profileForm.get(['personalDetails', 'address']);
	}
	get city() {
		return this.profileForm.get(['personalDetails', 'city']);
	}

	onSubmit(): void {
		const { email, password } = this.profileForm.value.credentials!;
		const { firstName, lastName, phone, address, city } =
			this.profileForm.value.personalDetails!;

		this.userFacade.registerUser(
			email as string,
			password as string,
			firstName as string,
			lastName as string,
			phone as string,
			address as string,
			city as string
		);
		this.loading$
			.pipe(
				takeUntil(this.completer$),
				map((loading: boolean) => {
					if (loading) {
						this.router.navigate(['/']);
					}
				})
			)
			.subscribe();

		this.profileForm.reset();
	}
}
