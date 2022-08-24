import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
	emailPattern,
	passwordPattern,
} from 'src/app/shared/variables/validationPatterns';
import { UserAuth } from 'src/app/shared/interfaces/User.interface';
import { server } from 'src/app/shared/variables/config';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private router: Router,
		private storageService: StorageService
	) {}

	profileForm = this.fb.group({
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
				updateOn: 'change',
			},
		],
	});

	get email() {
		return this.profileForm.get(['email']);
	}
	get password() {
		return this.profileForm.get(['password']);
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const { email, password } = this.profileForm.value;
		const headers = { 'content-type': 'application/json' };

		this.http
			.post<UserAuth>(
				`${server}/users/login`,
				{ email, password },
				{ headers: headers, responseType: 'json' }
			)
			.subscribe({
				next: (response) => {
					this.storageService.setStorage(response)
					this.router.navigate(['/'])
				},
				error: (error) => console.log(error),
			});

		this.profileForm.reset();
	}
}
