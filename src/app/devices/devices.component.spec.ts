import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DeviceFacade } from '../state/device/device.facade';

import { DevicesComponent } from './devices.component';

describe('DevicesComponent', () => {
	let component: DevicesComponent;
	let fixture: ComponentFixture<DevicesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DevicesComponent],
			providers: [provideMockStore({}), DeviceFacade],
		}).compileComponents();

		fixture = TestBed.createComponent(DevicesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
