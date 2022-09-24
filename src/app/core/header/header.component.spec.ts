import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			providers: [provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should show guest view if no token', () => {
		component.token = '';
		fixture.detectChanges();
		
		const loginNav: HTMLElement = fixture.debugElement.query(
			By.css('.header__login_nav')
		).nativeElement;
		const registerNav: HTMLElement = fixture.debugElement.query(
			By.css('.header__register_nav')
		).nativeElement;

		expect(loginNav).toBeTruthy();
		expect(registerNav).toBeTruthy();
	});
	it('should show user view if token', () => {
		component.token = '12312312312asdasdasd';
		fixture.detectChanges();

		const postingsNav: HTMLElement = fixture.debugElement.query(
			By.css('.header__postings')
		).nativeElement;
		const settingsNav: HTMLElement = fixture.debugElement.query(
			By.css('.header__settings')
		).nativeElement;
		const logoutNav: HTMLElement = fixture.debugElement.query(
			By.css('.header__logout_nav')
		).nativeElement;

		expect(postingsNav).toBeTruthy();
		expect(settingsNav).toBeTruthy();
		expect(logoutNav).toBeTruthy();
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
