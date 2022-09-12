import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const passwordPattern =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;
export const phonePattern = /^[0-9]{6,}$/i;

export const passwordMatch: ValidatorFn = (
	control: AbstractControl
): ValidationErrors | null => {
	const password = control.get('password');
	const passwordRe = control.get('passwordRe');

	return password && passwordRe && password.value !== passwordRe.value
		? { mismatch: true }
		: null;
};

export const confirmDelete: ValidatorFn = (
	control: AbstractControl
): ValidationErrors | null => {
	const confirm = control.get('confirm');

	return confirm && confirm.value !== 'I confirm to delete my account'
		? { mismatch: true }
		: null;
};
