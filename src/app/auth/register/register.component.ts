import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { emailPattern } from 'src/app/shared/variables/emailValidation';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
	// Pattern for checking email validitiy
	emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

	profileForm = this.fb.group({
		credentials: this.fb.group({
			email: [
				'',
				{
					validators: [Validators.required, Validators.pattern(this.emailPattern)],
					updateOn: 'blur',
				},
			],
			password: [
				'',
				{
					validators: [Validators.required, Validators.minLength(8)],
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
					validators: [
						Validators.required,
						Validators.minLength(7),
						Validators.pattern('[0-9+]*'),
					],
					updateOn: 'blur',
				},
			],
			address: [
				'',
				{
					validators: [Validators.required, Validators.minLength(1)],
					updateOn: 'blur',
				},
			],
			city: [
				'',
				{
					validators: [Validators.required, Validators.minLength(1)],
					updateOn: 'blur',
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
		console.log(this.profileForm.value);
		console.log(this.profileForm.valid);
	}

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}
}
