import {
	Component,
	EventEmitter,
	Input,
	NO_ERRORS_SCHEMA,
	Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Device, DeviceState } from '../state/device/device.state';
import { DetailsComponent } from './details/details.component';

import { DevicesComponent } from './devices.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';

@Component({
	selector: 'app-list',
	template: '',
})
class FakeListComponent implements Partial<ListComponent> {
	@Input() data!: Device[] | null | undefined;
	@Output() request = new EventEmitter<string>();
	@Output() details = new EventEmitter<string>();
}

@Component({
	selector: 'app-details',
	template: '',
})
class FakeDetailsComponent implements Partial<DetailsComponent> {
	@Input() details!: Device | null;
}

@Component({
	selector: 'app-search',
	template: '',
})
class FakeSearchComponent implements Partial<SearchComponent> {
	@Output() search = new EventEmitter<string>();
}

describe('DevicesComponent', () => {
	let component: DevicesComponent;
	let fixture: ComponentFixture<DevicesComponent>;
	let store: MockStore;
	const initialState: DeviceState = {
		devices: null,
		details: null,
		loaded: false,
		error: null,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				DevicesComponent,
				FakeDetailsComponent,
				FakeListComponent,
				FakeSearchComponent,
			],
			providers: [provideMockStore({ initialState })],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(DevicesComponent);
		store = TestBed.inject(MockStore);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should request more data upon trigger', () => {
		const listEl = fixture.debugElement.query(By.directive(FakeListComponent));
		const listComponent: FakeListComponent = listEl.componentInstance;

		spyOn(component, 'loadMore');
		listComponent.request.emit('request more data');
		fixture.detectChanges();
		expect(component.loadMore).toHaveBeenCalled();
	});
	it('should request query data upon trigger', () => {
		const searchEl = fixture.debugElement.query(
			By.directive(FakeSearchComponent)
		);
		const SearchComponent: FakeSearchComponent = searchEl.componentInstance;

		spyOn(component, 'query');
		SearchComponent.search.emit('a string');
		fixture.detectChanges();
		expect(component.query).toHaveBeenCalled();
	});
	it('should request details upon trigger', () => {
		const listEl = fixture.debugElement.query(By.directive(FakeListComponent));
		const listComponent: FakeListComponent = listEl.componentInstance;

		spyOn(component, 'getDetails');
		listComponent.details.emit('key');
		fixture.detectChanges();
		expect(component.getDetails).toHaveBeenCalled();
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
