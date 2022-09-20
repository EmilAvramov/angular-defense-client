import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DetailsComponent } from './details.component';

describe('ModalComponent', () => {
	let component: DetailsComponent;
	let fixture: ComponentFixture<DetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetailsComponent],
			providers: [provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(DetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
});
