import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
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

		const buttonDE: DebugElement = fixture.debugElement.query(
			By.css('.search__create')
		);
		const buttonHTML: HTMLButtonElement = buttonDE.nativeElement;
		buttonHTML.click();
		fixture.detectChanges();

		expect(component.onCreate).toHaveBeenCalled();
		expect(component.create.emit).toHaveBeenCalled();
	});
	it('should emit a search string', fakeAsync(() => {
		spyOn(component.search, 'emit');
		fixture.detectChanges();

		const searchInputDe: DebugElement = fixture.debugElement.query(
			By.css('.search__input')
		);
		const searchInputHTML: HTMLInputElement = searchInputDe.nativeElement;

		searchInputHTML.value = 'test input';
		searchInputHTML.dispatchEvent(new Event('input'));
		tick(1000);

		fixture.detectChanges();
		expect(component.search.emit).toHaveBeenCalledWith('test input');
	}));
});
