import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { FormBuilder, Validators } from '@angular/forms';
import {
	emailPattern,
	passwordPattern,
	phonePattern,
} from 'src/app/shared/variables/validationPatterns';
import { User } from 'src/app/shared/interfaces/User.interface';
import { optionsPost, server } from 'src/app/shared/variables/config';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.sass'],
})
@Injectable()
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
		const { email, password } = this.profileForm.value.credentials!;
		const { firstName, lastName, phone, address, city } =
			this.profileForm.value.personalDetails!;
		const headers = { 'content-type': 'application/json' };

		this.http
			.post<User>(
				`${server}/users/register`,
				{
					email,
					password,
					firstName,
					lastName,
					phone,
					address,
					city,
				},
				{ headers: headers }
			)
			.subscribe({
				next: (response) => console.log(response),
				error: (error) => console.log(error),
			});
		this.profileForm.reset();
	}

	constructor(private fb: FormBuilder, private http: HttpClient) {}

	ngOnInit(): void {}
}
