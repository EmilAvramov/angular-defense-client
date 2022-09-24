import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule],
			declarations: [LoginComponent],
			providers: [provideMockStore({}), FormBuilder],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should render empty form', () => {
		const { email, password } = component.profileForm.value;

		expect(email).toBe('');
		expect(password).toBe('');
	});
	it('should be invalid if empty', () => {
		expect(component.profileForm.valid).toBeFalsy();
	});
	it('(email) should be valid if validation passed', () => {
		const email = component.profileForm.controls.email;

		email.setValue('123@123.com');

		expect(email.valid).toBeTrue();
	});
	it('(email) should be invalid if validation failed', () => {
		const email = component.profileForm.controls.email;

		email.setValue('123@12');
		expect(email.valid).toBeFalsy();
		expect(email.hasError('pattern')).toBeTruthy();

		email.setValue('12345');
		expect(email.valid).toBeFalsy();
		expect(email.hasError('pattern')).toBeTruthy();

		email.setValue('123@dot.com.');
		expect(email.valid).toBeFalsy();
		expect(email.hasError('pattern')).toBeTruthy();
	});
	it('(password) should be valid if validation passed', () => {
		const password = component.profileForm.controls.password;

		password.setValue('abcd123!@');

		expect(password.valid).toBeTrue();
	});
	it('(password) should be invalid if validation failed', () => {
		const password = component.profileForm.controls.password;

		password.setValue('aaaaaaaaa');
		expect(password.valid).toBeFalsy();
		expect(password.hasError('pattern')).toBeTruthy();

		password.setValue('12345');
		expect(password.valid).toBeFalsy();
		expect(password.hasError('pattern')).toBeTruthy();

		password.setValue('12345asd');
		expect(password.valid).toBeFalsy();
		expect(password.hasError('pattern')).toBeTruthy();

		password.setValue('a!@1');
		expect(password.valid).toBeFalsy();
		expect(password.hasError('pattern')).toBeTruthy();
	});
	it('(form) should not submit if validation not passed', () => {
		spyOn(component, 'onSubmit');
		const email: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__email')
		).nativeElement;
		const password: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__password')
		).nativeElement;
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.form__submit')
		).nativeElement;

		email.value = '123';
		email.dispatchEvent(new Event('input'));
		email.dispatchEvent(new Event('blur'));
		password.value = 'abcd@a1@111!';
		password.dispatchEvent(new Event('input'));
		password.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		expect(component.profileForm.controls.email.errors).toBeTruthy();
		expect(component.profileForm.valid).toBeFalsy();
		expect(button.disabled).toBeTruthy();

		button.click();
		fixture.detectChanges();

		expect(component.onSubmit).toHaveBeenCalledTimes(0);
	});
	it('(form) should submit if validation passed', () => {
		spyOn(component, 'onSubmit');
		const email: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__email')
		).nativeElement;
		const password: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__password')
		).nativeElement;
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.form__submit')
		).nativeElement;

		email.value = '123@123.com';
		email.dispatchEvent(new Event('input'));
		email.dispatchEvent(new Event('blur'));
		password.value = 'abcd@a1@111!';
		password.dispatchEvent(new Event('input'));
		password.dispatchEvent(new Event('change'));
		fixture.detectChanges();

		expect(component.profileForm.errors).toBeFalsy();
		expect(component.profileForm.valid).toBeTruthy();
		expect(button.disabled).toBeFalsy();

		button.click();
		fixture.detectChanges();

		expect(component.onSubmit).toHaveBeenCalledTimes(1);
	});
});
