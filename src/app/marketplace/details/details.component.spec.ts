import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { mockPostingDetails } from 'src/app/shared/mockData/postings.mock';
import { mockUser } from 'src/app/shared/mockData/users.mock';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
	let component: DetailsComponent;
	let fixture: ComponentFixture<DetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetailsComponent],
			providers: [provideMockStore({}), { provide: MatDialog, useValue: {} }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailsComponent);
		component = fixture.componentInstance;
		component.display$ = of(true);
		component.details$ = of(mockPostingDetails);
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
	it('should emit delete id on trigger', () => {
		spyOn(component, 'emitDelete');
		component.validatedUser$ = of(mockUser);
		fixture.detectChanges();

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
