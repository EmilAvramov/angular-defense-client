import { DebugElement } from '@angular/core';
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
		const profileNav: HTMLElement = fixture.debugElement.query(
			By.css('.header__dropdown')
		).nativeElement;
		const logoutNav: HTMLElement = fixture.debugElement.query(
			By.css('.header__logout_nav')
		).nativeElement;

		expect(profileNav).toBeTruthy();
		expect(logoutNav).toBeTruthy();
	});
	it('should show dropdown on hover', () => {
		component.token = '12312312312asdasdasd';
		fixture.detectChanges();
		const dropdown: DebugElement = fixture.debugElement.query(
			By.css('.header__dropdown')
		);

		spyOn(component, 'openDropDown');
		dropdown.triggerEventHandler('mouseover');
		fixture.detectChanges();
		expect(component.openDropDown).toHaveBeenCalled();
	});
	it('should hide dropdown on mouse leave', () => {
		component.token = '12312312312asdasdasd';
		fixture.detectChanges();
		const dropdown: DebugElement = fixture.debugElement.query(
			By.css('.header__dropdown')
		);

		spyOn(component, 'closeDropDown');
		dropdown.triggerEventHandler('mouseleave');
		fixture.detectChanges();
		expect(component.closeDropDown).toHaveBeenCalled();
	});
});
