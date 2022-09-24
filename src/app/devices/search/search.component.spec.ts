import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchComponent],
			imports: [ReactiveFormsModule],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should init search input as empty value', () => {
		const query: AbstractControl = component.searchForm.controls.query;
		expect(query.value).toEqual('');
	});
	it('should trigger component onSubmit form function', () => {
		spyOn(component, 'onSubmit');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('button')
		).nativeElement;

		button.click();
		fixture.detectChanges();

		expect(component.onSubmit).toHaveBeenCalled();
	});
	it('should trigger emitter with given search value', () => {
		spyOn(component.search, 'emit');
		const query: AbstractControl = component.searchForm.controls.query;
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('button')
		).nativeElement;

		query.setValue('search');
		fixture.detectChanges();
		expect(query.value).toEqual('search');

		button.click();
		fixture.detectChanges();
		expect(component.search.emit).toHaveBeenCalledWith('search');
	});
	it('should reset query after submission', () => {
		const query: AbstractControl = component.searchForm.controls.query;
		query.setValue('reset me');
		fixture.detectChanges();

		component.onSubmit();
		expect(query.value).toBeNull();
	});
});
