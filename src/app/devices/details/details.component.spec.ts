import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { deviceMockDataDetails } from 'src/app/shared/mockData/devices.mock';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from './details.component';

describe('ModalComponent', () => {
	let component: DetailsComponent;
	let fixture: ComponentFixture<DetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatDialogModule],
			declarations: [DetailsComponent],
			providers: [provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailsComponent);
		component = fixture.componentInstance;
		component.display$ = of(true);
		component.details = deviceMockDataDetails;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should receive data on load', () => {
		spyOn(component, 'close');
		const details: HTMLElement = fixture.debugElement.query(
			By.css('.details__body')
		).nativeElement;

		expect(details).toBeTruthy();
	});
	it('should close modal on button click', () => {
		spyOn(component, 'close');
		const closeButton: HTMLButtonElement = fixture.debugElement.query(
			By.css('.close')
		).nativeElement;

		closeButton.click();
		fixture.detectChanges();

		expect(component.close).toHaveBeenCalled();
	});
	it('should close modal on wrapper click', () => {
		spyOn(component, 'close');
		const wrapper: HTMLElement = fixture.debugElement.query(
			By.css('.details__wrapper')
		).nativeElement;

		wrapper.click();
		fixture.detectChanges();

		expect(component.close).toHaveBeenCalled();
	});
});
