import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockPostingDetails } from 'src/app/shared/mockData/postings.mock';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
	let component: EditComponent;
	let fixture: ComponentFixture<EditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EditComponent],
			providers: [provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(EditComponent);
		component = fixture.componentInstance;
		component.display$ = of(true);
		component.details$ = of(mockPostingDetails);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should trigger edit method on button click', () => {
		spyOn(component, 'emitEdit').and.callThrough();
		spyOn(component.editPosting, 'emit');
		const editButton: HTMLButtonElement = fixture.debugElement.query(
			By.css('.edit')
		).nativeElement;
		const editComments: HTMLInputElement = fixture.debugElement.query(
			By.css('.details__input_comments')
		).nativeElement;
		const editPrice: HTMLInputElement = fixture.debugElement.query(
			By.css('.details__input_price')
		).nativeElement;

		editComments.value = 'test comments';
		editComments.dispatchEvent(new Event('input'));
		editComments.dispatchEvent(new Event('blur'));
		editPrice.value = '999';
		editPrice.dispatchEvent(new Event('input'));
		editPrice.dispatchEvent(new Event('blur'));
		editButton.click();
		fixture.detectChanges();

		expect(component.emitEdit).toHaveBeenCalledWith(1);
		expect(component.editPosting.emit).toHaveBeenCalledWith({
			id: 1,
			comments: 'test comments',
			price: 999,
		});
	});
	it('should trigger delete method on button click', () => {
		spyOn(component, 'emitDelete');
		const deleteButton: HTMLButtonElement = fixture.debugElement.query(
			By.css('.delete')
		).nativeElement;

		deleteButton.click();
		fixture.detectChanges();

		expect(component.emitDelete).toHaveBeenCalledWith(1);
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
