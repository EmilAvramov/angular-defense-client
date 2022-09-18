import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { map } from 'rxjs';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RegisterComponent],
			providers: [provideMockStore({}), FormBuilder],
		}).compileComponents();

		fixture = TestBed.createComponent(RegisterComponent);
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
		const { credentials, personalDetails } = component.profileForm.value;
		expect(credentials?.email).toBe('');
		expect(credentials?.password).toBe('');
		expect(personalDetails?.firstName).toBe('');
		expect(personalDetails?.lastName).toBe('');
		expect(personalDetails?.phone).toBe('');
		expect(personalDetails?.address).toBe('');
		expect(personalDetails?.city).toBe('');
	});
	it('should be invalid if empty', () => {
		expect(component.profileForm.valid).toBeFalsy();
	});
});
