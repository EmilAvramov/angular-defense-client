import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
	let component: CreateComponent;
	let fixture: ComponentFixture<CreateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CreateComponent],
			providers: [FormBuilder],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should emit a search string', fakeAsync(() => {
		spyOn(component.requestDeviceList, 'emit');
		fixture.detectChanges();

		const searchInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.search__input')
		).nativeElement;

		searchInput.value = 'test input';
		searchInput.dispatchEvent(new Event('input'));
		tick(1000);

		fixture.detectChanges();
		expect(component.requestDeviceList.emit).toHaveBeenCalledWith('test input');
	}));
	it('should close modal on button click', () => {
		spyOn(component, 'close').and.callThrough();
		spyOn(component.clearDetails, 'emit');
		spyOn(component.postingForm, 'reset');
		component.display$ = of(true);
		fixture.detectChanges();

		const closeButton: HTMLButtonElement = fixture.debugElement.query(
			By.css('.close')
		).nativeElement;
		const searchInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.search__input')
		).nativeElement;
		fixture.detectChanges();

		closeButton.click();
		fixture.detectChanges()
		
		expect(component.close).toHaveBeenCalled();
		expect(searchInput.value).toEqual('');
		expect(component.clearDetails.emit).toHaveBeenCalled();
		expect(component.postingForm.reset).toHaveBeenCalled();
	});
	it('should close modal on wrapper click', () => {
		spyOn(component, 'close').and.callThrough();
		spyOn(component.clearDetails, 'emit');
		spyOn(component.postingForm, 'reset');
		component.display$ = of(true);
		fixture.detectChanges();

		const wrapper: HTMLElement = fixture.debugElement.query(
			By.css('.create__wrapper')
		).nativeElement;
		const searchInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.search__input')
		).nativeElement;
		fixture.detectChanges();

		wrapper.click();
		fixture.detectChanges()

		expect(component.close).toHaveBeenCalled();
		expect(searchInput.value).toEqual('');
		expect(component.clearDetails.emit).toHaveBeenCalled();
		expect(component.postingForm.reset).toHaveBeenCalled();
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
