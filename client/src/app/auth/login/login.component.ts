import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
	emailPattern,
	passwordPattern,
} from 'src/app/shared/variables/validationPatterns';
import { Router } from '@angular/router';
import { UserFacade } from '../../state/user/user.facade';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnDestroy {
	public completer$: Subject<void> = new Subject<void>();

	public error: string | null | undefined;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private readonly userFacade: UserFacade
	) {}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

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

	onSubmit(): void {
		const { email, password } = this.profileForm.value;

		this.userFacade.loginUser(email as string, password as string);
		this.userFacade.userError$
			.pipe(
				takeUntil(this.completer$),
				map((error: string | null) => (this.error = error))
			)
			.subscribe();
		if (this.error) {
			console.log(this.error);
		} else {
			this.router.navigate(['/']);
		}
		this.profileForm.reset();
	}
}
