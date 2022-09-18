import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DevicesComponent } from './devices.component';

describe('DevicesComponent', () => {
	let component: DevicesComponent;
	let fixture: ComponentFixture<DevicesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DevicesComponent],
			providers: [provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(DevicesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('(loadMore) should increase limit', () => {

	});
	it('(query) should reset limit to 100', () => {

	});
	it('(getDetails) should open model', () => {

	})
});
