import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { PostingsComponent } from './postings.component';

describe('PostingsComponent', () => {
	let component: PostingsComponent;
	let fixture: ComponentFixture<PostingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostingsComponent],
			providers: [FormBuilder, provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(PostingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
