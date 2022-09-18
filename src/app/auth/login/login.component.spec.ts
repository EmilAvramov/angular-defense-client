import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { map } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginComponent],
			providers: [provideMockStore({}), FormBuilder],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should load as false', () => {
		let state: boolean = false;
		component.loading$.pipe(map((value) => (state = value)));
		expect(state).toBe(false);
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
		const email: AbstractControl = component.profileForm.controls.email;
		const password: AbstractControl = component.profileForm.controls.password;
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('button')
		).nativeElement;

		spyOn(component, 'onSubmit');
		email.setValue('123');
		password.setValue('abcd@a1@111!');
		fixture.detectChanges();
		expect(component.profileForm.valid).toBeFalsy();
		expect(button.disabled).toBeTruthy();
		fixture
			.whenStable()
			.then(() => button.click())
			.finally(() => expect(component.onSubmit).toHaveBeenCalledTimes(0));
	});
	it('(form) should submit if validation passed', () => {
		const email: AbstractControl = component.profileForm.controls.email;
		const password: AbstractControl = component.profileForm.controls.password;
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('button')
		).nativeElement;

		email.setValue('123@123.com');
		password.setValue('Abcd@a1@111!');
		fixture.detectChanges();
		spyOn(component, 'onSubmit');
		expect(component.profileForm.valid).toBeTruthy();
		expect(button.disabled).toBeFalsy();
		fixture
			.whenStable()
			.then(() => button.click())
			.finally(() => {
				expect(component.onSubmit).toHaveBeenCalledTimes(1);
				expect(email.value).toBe('');
				expect(password.value).toBe('');
			});
	});
});
