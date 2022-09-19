import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
	deviceMockDataPartial,
	deviceMockDataFull,
} from 'src/app/shared/mockData/devices.mock';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should trigger load more emitter', () => {
		component.data = deviceMockDataFull;
		expect(component.data.length).toBeGreaterThan(18);
		fixture.detectChanges();
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.devices__more')
		).nativeElement;

		spyOn(component, 'loadMore');
		button.click();
		fixture.detectChanges();
		expect(component.loadMore).toHaveBeenCalled();
	});
	it('should not be visible if not enough data', () => {
		component.data = deviceMockDataPartial;
		expect(component.data.length).toBe(1);
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css('.devices__more'))).toBeNull();
	});
  it('should trigger')
});
