import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockPostingDetails } from 'src/app/shared/mockData/postings.mock';
import { mockUser } from 'src/app/shared/mockData/users.mock';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
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
		component.details$ = of(mockPostingDetails);
		fixture.detectChanges();

		const detailsDE: DebugElement = fixture.debugElement.query(
			By.css('.details__body')
		);
		const detailsHTML: HTMLElement = detailsDE.nativeElement;

		expect(detailsHTML).toBeTruthy();
	});
	// it('should emit edit data on trigger', () => {
	// 	spyOn(component, 'emitEdit').and.callThrough();
	// 	spyOn(component.editPosting, 'emit');
	// 	component.validatedUser$ = of(mockUser);
	// 	component.display$ = of(true);
	// 	component.details$ = of(mockPostingDetails);
	// 	fixture.detectChanges();

	// 	const editButtonDE: DebugElement = fixture.debugElement.query(
	// 		By.css('.edit')
	// 	);
	// 	const editButtonHTML: HTMLButtonElement = editButtonDE.nativeElement;
	// 	const editCommentsDe: DebugElement = fixture.debugElement.query(
	// 		By.css('.details__input_comments')
	// 	);
	// 	const editCommentsHTML: HTMLButtonElement = editCommentsDe.nativeElement;
	// 	const editPriceDE: DebugElement = fixture.debugElement.query(
	// 		By.css('.details__input_price')
	// 	);
	// 	const editPriceHTML: HTMLButtonElement = editPriceDE.nativeElement;

	// 	editCommentsHTML.value = 'test comments';
	// 	editPriceHTML.value = '999';
	// 	editButtonHTML.click();
	// 	fixture.detectChanges();

	// 	expect(component.emitEdit).toHaveBeenCalledWith(1);
	// 	expect(component.editPosting.emit).toHaveBeenCalledWith({
	// 		id: 1,
	// 		comments: 'test comments',
	// 		price: 999,
	// 	});
	// });
	it('should emit delete id on trigger', () => {
		spyOn(component, 'emitDelete');
		component.validatedUser$ = of(mockUser);
		component.display$ = of(true);
		component.details$ = of(mockPostingDetails);
		fixture.detectChanges();

		const deleteButtonDE: DebugElement = fixture.debugElement.query(
			By.css('.delete')
		);
		const deleteButtonHTML: HTMLButtonElement = deleteButtonDE.nativeElement;
		deleteButtonHTML.click();
		fixture.detectChanges();

		expect(component.emitDelete).toHaveBeenCalledWith(1);
	});
	it('should close modal on button click', () => {
		spyOn(component, 'close');
		component.display$ = of(true);
		component.details$ = of(mockPostingDetails);
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
		component.details$ = of(mockPostingDetails);
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
