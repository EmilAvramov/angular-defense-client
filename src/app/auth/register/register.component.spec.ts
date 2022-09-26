import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule],
			declarations: [RegisterComponent],
			providers: [provideMockStore({}), FormBuilder],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
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
	it('should close observables on component destroy', () => {
		const next = spyOn(component.completer$, 'next');
		const complete = spyOn(component.completer$, 'complete');

		fixture.destroy();
		fixture.detectChanges();

		expect(next).toHaveBeenCalled();
		expect(complete).toHaveBeenCalled();
	});
});
