import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockUser } from 'src/app/shared/mockData/users.mock';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule],
			declarations: [SettingsComponent],
			providers: [FormBuilder, provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		component.userData$ = of(mockUser);
		component.ngOnInit();
		component.ngAfterViewInit();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('user details should be filled after view init', () => {
		const { email, firstName, lastName, phone, address, city } =
			component.profileForm.value;

		expect(email).toEqual('fakeEmail@email.com');
		expect(firstName).toEqual('fakeFirstName');
		expect(lastName).toEqual('fakeLastName');
		expect(phone).toEqual('1234856777');
		expect(address).toEqual('fakeAddress');
		expect(city).toEqual('fakeCity');

		expect(component.profileForm.valid).toBeTruthy();
	});
	it('should trigger change details method on button click if input valid', () => {
		spyOn(component, 'changeDetails');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.form__changeDetails')
		).nativeElement;
		const emailInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__email')
		).nativeElement;
		fixture.detectChanges();

		emailInput.value = 'newEmail@email.com';
		emailInput.dispatchEvent(new Event('input'));
		emailInput.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		button.click();
		fixture.detectChanges();

		expect(component.profileForm.controls.email.value).toBe('newEmail@email.com');
		expect(component.changeDetails).toHaveBeenCalled();
	});
	it('should not trigger changer details method if form invalud', () => {
		spyOn(component, 'changeDetails');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.form__changeDetails')
		).nativeElement;
		const emailInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__email')
		).nativeElement;
		fixture.detectChanges();

		emailInput.value = 'newEmail@email';
		emailInput.dispatchEvent(new Event('input'));
		emailInput.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		button.click();
		fixture.detectChanges();

		expect(component.changeDetails).toHaveBeenCalledTimes(0);
	});
	it('should trigger change password method on button click if input valid', () => {
		spyOn(component, 'changePassword');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.form__changePassword')
		).nativeElement;
		const currentPassword: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__currentPassword')
		).nativeElement;
		const newPassword: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__password')
		).nativeElement;
		const newPasswordRe: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__passwordRe')
		).nativeElement;
		currentPassword.value = '12345asda!213!@';
		currentPassword.dispatchEvent(new Event('input'));
		currentPassword.dispatchEvent(new Event('blur'));
		newPassword.value = '12345asdfg!@#!';
		newPassword.dispatchEvent(new Event('input'));
		newPassword.dispatchEvent(new Event('blur'));
		newPasswordRe.value = '12345asdfg!@#!';
		newPasswordRe.dispatchEvent(new Event('input'));
		newPasswordRe.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		button.click();
		fixture.detectChanges();

		expect(component.changePassword).toHaveBeenCalled();
		expect(component.passwordForm.controls['password'].value).toBe(
			'12345asdfg!@#!'
		);
		expect(component.passwordForm.controls['passwordRe'].value).toBe(
			'12345asdfg!@#!'
		);
	});
	it('should not trigger change password method if input invalid', () => {
		spyOn(component, 'changePassword');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.form__changePassword')
		).nativeElement;
		const currentPassword: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__currentPassword')
		).nativeElement;

		currentPassword.value = '12345asda!213!@';
		currentPassword.dispatchEvent(new Event('input'));
		currentPassword.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		button.click();
		fixture.detectChanges();

		expect(component.changePassword).toHaveBeenCalledTimes(0);
	});
	it('should trigger delete method on button click if input valid', () => {
		spyOn(component, 'deleteAccount');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.form__confirmDelete')
		).nativeElement;
		const currentPassword: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__confirmInput')
		).nativeElement;

		currentPassword.value = 'I confirm to delete my account';
		currentPassword.dispatchEvent(new Event('input'));
		currentPassword.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		button.click();
		fixture.detectChanges();

		expect(component.deleteAccount).toHaveBeenCalled();
	});
	it('should close observables on component destroy', () => {
		const next = spyOn(component.completer$, 'next');
		const complete = spyOn(component.completer$, 'complete');

		fixture.destroy();
		fixture.detectChanges();

		expect(next).toHaveBeenCalled();
		expect(complete).toHaveBeenCalled();
	});
});
