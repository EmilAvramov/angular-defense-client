import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('(button) should not be visible to guests', () => {
		expect(fixture.debugElement.query(By.css('.search__create'))).toBeNull();
	});
	it('should emit a search string', fakeAsync(() => {
		spyOn(component.search, 'emit');
		const searchInput: HTMLInputElement = fixture.debugElement.query(
			By.css('.search__input')
		).nativeElement;

		searchInput.value = 'test input';
		searchInput.dispatchEvent(new Event('input'));
		tick(1000);

		fixture.detectChanges();
		expect(component.search.emit).toHaveBeenCalledWith('test input');
	}));
});
