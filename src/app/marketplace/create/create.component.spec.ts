import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
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

		const searchInputDe: DebugElement = fixture.debugElement.query(
			By.css('.search__input')
		);
		const searchInputHTML: HTMLInputElement = searchInputDe.nativeElement;

		searchInputHTML.value = 'test input';
		searchInputHTML.dispatchEvent(new Event('input'));
		tick(1000);

		fixture.detectChanges();
		expect(component.requestDeviceList.emit).toHaveBeenCalledWith('test input');
	}));
	it('should close observables on component destroy', () => {
		const next = spyOn(component.completer$, 'next');
		const complete = spyOn(component.completer$, 'complete');

		fixture.destroy();
		fixture.detectChanges();

		expect(next).toHaveBeenCalled();
		expect(complete).toHaveBeenCalled();
	});
	it('should close modal on button click', () => {
		spyOn(component, 'close').and.callThrough();
		spyOn(component.clearDetails, 'emit');
		spyOn(component.postingForm, 'reset');
		component.display$ = of(true);
		fixture.detectChanges();

		const closeDebugEl: DebugElement = fixture.debugElement.query(
			By.css('.close')
		);
		const closeButton: HTMLButtonElement = closeDebugEl.nativeElement;
		const searchInputDe: DebugElement = fixture.debugElement.query(
			By.css('.search__input')
		);
		const searchInputHTML: HTMLInputElement = searchInputDe.nativeElement;
		fixture.detectChanges();

		closeButton.click();
		expect(component.close).toHaveBeenCalled();
		expect(searchInputHTML.value).toEqual('');
		expect(component.clearDetails.emit).toHaveBeenCalled();
		expect(component.postingForm.reset).toHaveBeenCalled();
	});
	it('should close modal on wrapper click', () => {
		spyOn(component, 'close').and.callThrough();
		spyOn(component.clearDetails, 'emit');
		spyOn(component.postingForm, 'reset');
		component.display$ = of(true);
		fixture.detectChanges();

		const wrapperDE: DebugElement = fixture.debugElement.query(
			By.css('.create__wrapper')
		);
		const wrapperHTML: HTMLElement = wrapperDE.nativeElement;
		const searchInputDe: DebugElement = fixture.debugElement.query(
			By.css('.search__input')
		);
		const searchInputHTML: HTMLInputElement = searchInputDe.nativeElement;
		fixture.detectChanges();

		wrapperHTML.click();
		expect(component.close).toHaveBeenCalled();
		expect(searchInputHTML.value).toEqual('');
		expect(component.clearDetails.emit).toHaveBeenCalled();
		expect(component.postingForm.reset).toHaveBeenCalled();
	});
});
