import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
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
	it('should trigger change details method on button click when input is valid', () => {
		spyOn(component, 'changeDetails');
		const buttonDE: DebugElement = fixture.debugElement.query(
			By.css('.form__changeDetails')
		);
		const buttonEl: HTMLButtonElement = buttonDE.nativeElement;
		const emailEl: HTMLInputElement = fixture.debugElement.query(
			By.css('.form__email')
		).nativeElement;
		fixture.detectChanges();

		emailEl.value = 'newEmail@email.com';
		emailEl.dispatchEvent(new Event('input'));
		emailEl.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		buttonEl.click();
		fixture.detectChanges();

		expect(component.profileForm.controls.email.value).toBe('newEmail@email.com');
		expect(component.changeDetails).toHaveBeenCalled();
	});
	it('should trigger change password on button click', () => {
		spyOn(component, 'changePassword');
		const buttonDE: DebugElement = fixture.debugElement.query(
			By.css('.form__ChangePassword')
		);
		const buttonEl: HTMLButtonElement = buttonDE.nativeElement;
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

		buttonEl.click();
		fixture.detectChanges();

		expect(component.changePassword).toHaveBeenCalled();
		expect(component.passwordForm.controls['password'].value).toBe(
			'12345asdfg!@#!'
		);
		expect(component.passwordForm.controls['passwordRe'].value).toBe(
			'12345asdfg!@#!'
		);
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
