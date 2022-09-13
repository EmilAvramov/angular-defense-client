import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
	emailPattern,
	passwordPattern,
} from 'src/app/shared/variables/validationPatterns';
import { Router } from '@angular/router';
import { UserFacade } from '../../state/user/user.facade';
import { map, Observable, of, Subject, takeUntil, tap } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnDestroy {
	public completer$: Subject<void> = new Subject<void>();

	public error$: Observable<string | null>;
	public loading$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private readonly userFacade: UserFacade
	) {
		this.error$ = this.userFacade.userError$;
		this.loading$ = this.userFacade.userLoaded$;
	}

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
