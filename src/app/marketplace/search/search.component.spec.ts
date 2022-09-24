import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { mockUser } from 'src/app/shared/mockData/users.mock';

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
	it('(button) should be visible to users', () => {
		component.user$ = of(mockUser);
		spyOn(component, 'onCreate').and.callThrough();
		spyOn(component.create, 'emit');
		fixture.detectChanges();

		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.search__create')
		).nativeElement;
		button.click();
		fixture.detectChanges();

		expect(component.onCreate).toHaveBeenCalled();
		expect(component.create.emit).toHaveBeenCalled();
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
