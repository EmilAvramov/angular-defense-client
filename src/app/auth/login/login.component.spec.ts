import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
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
});
