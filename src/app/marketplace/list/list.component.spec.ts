import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { mockPostingFull, mockPostingPartial } from 'src/app/shared/mockData/postings.mock';
import { Posting } from 'src/app/state/posting/posting.state';

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
	it('should not be visible if not enough data', () => {
		component.postings$ = of(mockPostingPartial);
		let data: Posting[] | null;
		component.postings$.subscribe((value) => (data = value));
		fixture.detectChanges();

		expect(data!.length).toEqual(1);
		expect(fixture.debugElement.query(By.css('postings__more'))).toBeNull();
	});
	it('should trigger load more emitter', () => {
		component.postings$ = of(mockPostingFull);
		let data: Posting[] | null;
		component.postings$.subscribe((value) => (data = value));
		fixture.detectChanges();
		expect(data!.length).toEqual(19);

		fixture.detectChanges();
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.postings__more')
		).nativeElement;

		spyOn(component, 'loadMore');
		button.click();
		fixture.detectChanges();
		expect(component.loadMore).toHaveBeenCalled();
	});
	it('should trigger details emitter', () => {
		component.postings$ = of(mockPostingFull);
		let data: Posting[] | null;
		component.postings$.subscribe((value) => (data = value));
		fixture.detectChanges();
		const image: HTMLImageElement = fixture.debugElement.query(
			By.css('img')
		).nativeElement;
		fixture.detectChanges();

		expect(data!.length).toEqual(19);

		spyOn(component, 'showDetails');
		image.click();
		fixture.detectChanges();
		expect(component.showDetails).toHaveBeenCalledWith(1);
	});
});
