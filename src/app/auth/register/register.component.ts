import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import {
	emailPattern,
	passwordPattern,
	phonePattern,
} from 'src/app/shared/variables/validationPatterns';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
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
		User.create({
			...this.profileForm.value.credentials,
			...this.profileForm.value.personalDetails,
		});
		console.log(this.profileForm.value.credentials);
		console.log(this.profileForm.valid);
	}

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}
}
