import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
	emailPattern,
	passwordPattern,
} from 'src/app/shared/variables/validationPatterns';
import { Router } from '@angular/router';
import { UserFacade } from '../../state/user/user.facade';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private readonly userFacade: UserFacade
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

		this.userFacade.userLogin(email as string, password as string)
		this.router.navigate(['/']);

		this.profileForm.reset();
	}
}
