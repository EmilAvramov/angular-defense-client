import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugTracingFeature } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { map } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let de: DebugElement;
	let el: HTMLElement;

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
		component.profileForm.controls.email.setValue('');
		component.profileForm.controls.password.setValue('');
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
		email.setValue('12345');
		expect(email.valid).toBeFalsy();
		email.setValue('123@dot.com.');
		expect(email.valid).toBeFalsy();
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
		password.setValue('12345');
		expect(password.valid).toBeFalsy();
		password.setValue('12345asd');
		expect(password.valid).toBeFalsy();
		password.setValue('a!@1');
		expect(password.valid).toBeFalsy();
	});
	it('should be invalid if validation not passed', () => {});
	it('should be valid if validation passed', () => {});
	it('should be not be clickable if form invalid', () => {});
	it('should be clickable if form valid', () => {});
});
