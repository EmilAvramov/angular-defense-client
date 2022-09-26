import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
	let component: CreateComponent;
	let fixture: ComponentFixture<CreateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule],
			declarations: [CreateComponent],
			providers: [provideMockStore({}), FormBuilder],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
