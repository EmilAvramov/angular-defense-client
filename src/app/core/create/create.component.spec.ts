import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import {
	deviceMockDataDetails,
	deviceMockDataFull,
	deviceMockDataPartial,
} from 'src/app/shared/mockData/devices.mock';
import { mockUser } from 'src/app/shared/mockData/users.mock';

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
	it('should fetch device list on search change', fakeAsync(() => {
		spyOn(component.postingForm, 'reset');
		const searchInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.search__input')
		).nativeElement;
		searchInput.value = 'xiaomi';
		searchInput.dispatchEvent(new Event('input'));
		searchInput.dispatchEvent(new Event('change'));
		tick(1000);
		fixture.detectChanges();

		expect(component.postingForm.reset).toHaveBeenCalled();
	}));
	it('should trigger method to fetch device details on click', () => {
		spyOn(component, 'fetchDeviceDetails');
		component.devices$ = of(deviceMockDataFull);
		fixture.detectChanges();

		const deviceBlock: HTMLElement = fixture.debugElement.query(
			By.css('.create__block')
		).nativeElement;
		deviceBlock.click();

		expect(component.fetchDeviceDetails).toHaveBeenCalledWith('key');
	});
	it('should trigger create method on click if form valid', fakeAsync(() => {
		spyOn(component, 'createPosting');
		component.user$ = of(mockUser);
		const searchInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.search__input')
		).nativeElement;
		fixture.detectChanges();

		searchInput.value = 'x';
		searchInput.dispatchEvent(new Event('input'));
		searchInput.dispatchEvent(new Event('change'));
		tick(1000);
		fixture.detectChanges();

		component.devices$ = of(deviceMockDataPartial);
		fixture.detectChanges();

		const device: HTMLElement = fixture.debugElement.query(
			By.css('.create__block')
		).nativeElement;
		device.click();
		fixture.detectChanges();

		component.details$ = of(deviceMockDataDetails);
		fixture.detectChanges();

		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.create__form_button')
		).nativeElement;
		const comments:AbstractControl = component.postingForm.controls.comments
		const price:AbstractControl = component.postingForm.controls.price

		comments.setValue('value')
		price.setValue('99')
		fixture.detectChanges();

		expect(component.postingForm.errors).toBeFalsy();
		expect(button.disabled).toBeFalsy();
		expect(component.postingForm.valid).toBeTruthy();
		button.click();
		fixture.detectChanges();

		expect(component.createPosting).toHaveBeenCalled();
	}));
	it('should close observables on component destroy', () => {
		const next = spyOn(component.completer$, 'next');
		const complete = spyOn(component.completer$, 'complete');

		fixture.destroy();
		fixture.detectChanges();

		expect(next).toHaveBeenCalled();
		expect(complete).toHaveBeenCalled();
	});
});
