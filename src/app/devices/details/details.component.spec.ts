import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { deviceMockDataDetails } from 'src/app/shared/mockData/devices.mock';

import { DetailsComponent } from './details.component';

describe('ModalComponent', () => {
	let component: DetailsComponent;
	let fixture: ComponentFixture<DetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetailsComponent],
			providers: [provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should receive data on load', () => {
		spyOn(component, 'close');
		component.display$ = of(true);
		component.details = deviceMockDataDetails;
		fixture.detectChanges();

		const detailsDE: DebugElement = fixture.debugElement.query(
			By.css('.details__body')
		);
		const detailsHTML: HTMLElement = detailsDE.nativeElement;

		expect(detailsHTML).toBeTruthy();
	});
	it('should close modal on button click', () => {
		spyOn(component, 'close');
		component.display$ = of(true);
		component.details = deviceMockDataDetails;
		fixture.detectChanges();

		const closeDebugEl: DebugElement = fixture.debugElement.query(
			By.css('.close')
		);
		const closeButton: HTMLButtonElement = closeDebugEl.nativeElement;
		fixture.detectChanges();

		closeButton.click();
		expect(component.close).toHaveBeenCalled();
	});
	it('should close modal on wrapper click', () => {
		spyOn(component, 'close');
		component.display$ = of(true);
		component.details = deviceMockDataDetails;
		fixture.detectChanges();

		const wrapperDE: DebugElement = fixture.debugElement.query(
			By.css('.details__wrapper')
		);
		const wrapperHTML: HTMLElement = wrapperDE.nativeElement;
		fixture.detectChanges();

		wrapperHTML.click();
		expect(component.close).toHaveBeenCalled();
	});
});
