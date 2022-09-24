import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockUser } from 'src/app/shared/mockData/users.mock';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SettingsComponent],
			providers: [FormBuilder, provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('user details should be filled after view init', () => {
		component.userData$ = of(mockUser);
		component.ngOnInit();
		fixture.detectChanges();

		component.ngAfterViewInit();
		fixture.detectChanges();

		const { email, firstName, lastName, phone, address, city } =
			component.profileForm.value;
		fixture.detectChanges();

		expect(email).toEqual('fakeEmail');
		expect(firstName).toEqual('fakeFirstName');
		expect(lastName).toEqual('fakeLastName');
		expect(phone).toEqual('fakePhone');
		expect(address).toEqual('fakeAddress');
		expect(city).toEqual('fakeCity');
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
