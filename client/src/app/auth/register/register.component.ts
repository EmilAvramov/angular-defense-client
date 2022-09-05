import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
	emailPattern,
	passwordPattern,
	phonePattern,
} from 'src/app/shared/variables/validationPatterns';
import { Router } from '@angular/router';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private readonly userFacade: UserFacade
	) {}

	profileForm = this.fb.group({
		credentials: this.fb.group({
			email: [
				'',
				{
					validators: [Validators.required, Validators.pattern(emailPattern)],
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
		}),
		personalDetails: this.fb.group({
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
		this.router.navigate(['/']);
		this.profileForm.reset();
	}

	ngOnInit(): void {}
}
