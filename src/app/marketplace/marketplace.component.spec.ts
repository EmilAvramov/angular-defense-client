import {
	Component,
	EventEmitter,
	Input,
	NO_ERRORS_SCHEMA,
	Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { mockPostingPayload } from '../shared/mockData/postings.mock';
import { Device } from '../state/device/device.state';
import { Posting, PostingPayload } from '../state/posting/posting.state';
import { User } from '../state/user/user.state';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

import { MarketplaceComponent } from './marketplace.component';
import { SearchComponent } from './search/search.component';

@Component({
	selector: 'app-list',
	template: '',
})
class FakeListComponent implements Partial<ListComponent> {
	@Input() postings$: Observable<Posting[] | null> | undefined;
	@Output() requestMore = new EventEmitter<null>();
	@Output() requestDetails = new EventEmitter<number>();
}

@Component({
	selector: 'app-create',
	template: '',
})
class FakeCreateComponent implements Partial<CreateComponent> {
	@Input() user$: Observable<User | null> | undefined;
	@Input() devices$: Observable<Device[] | null> | undefined;
	@Input() deviceDetails$: Observable<Device | null> | undefined;
	@Output() requestDeviceList = new EventEmitter<string>();
	@Output() requestDeviceDetails = new EventEmitter<string>();
	@Output() createPosting = new EventEmitter<PostingPayload>();
	@Output() clearDetails = new EventEmitter<null>();
}

@Component({
	selector: 'app-details',
	template: '',
})
class FakeDetailsComponent implements Partial<DetailsComponent> {
	@Input() details$: Observable<Posting | null> | undefined;
	@Input() validatedUser$: Observable<User | null> | undefined;
	@Output() editPosting = new EventEmitter<{
		id: number;
		comments: string;
		price: number;
	}>();
	@Output() deletePosting = new EventEmitter<number>();
}

@Component({
	selector: 'app-search',
	template: '',
})
class FakeSearchComponent implements Partial<SearchComponent> {
	@Input() user$: Observable<User | null> | undefined;
	@Output() search = new EventEmitter<string>();
	@Output() create = new EventEmitter<null>();
}

describe('MarketplaceComponent', () => {
	let component: MarketplaceComponent;
	let fixture: ComponentFixture<MarketplaceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MarketplaceComponent,
				FakeCreateComponent,
				FakeDetailsComponent,
				FakeListComponent,
				FakeSearchComponent,
			],
			providers: [provideMockStore({})],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(MarketplaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should trigger search method if emit triggered by child', () => {
		spyOn(component, 'searchPostings');
		const fakeSearch: FakeSearchComponent = fixture.debugElement.query(
			By.directive(FakeSearchComponent)
		).componentInstance;

		fakeSearch.search.emit('search text');
		fixture.detectChanges();

		expect(component.searchPostings).toHaveBeenCalledWith('search text');
	});
	it('should trigger loadMore method if emit triggered by child', () => {
		spyOn(component, 'loadMorePostings');
		const fakeList: FakeListComponent = fixture.debugElement.query(
			By.directive(FakeListComponent)
		).componentInstance;

		fakeList.requestMore.emit();
		fixture.detectChanges();

		expect(component.loadMorePostings).toHaveBeenCalled();
	});
	it('should trigger requestDetails method if emit triggered by child', () => {
		spyOn(component, 'fetchPostingDetails');
		const fakeList: FakeListComponent = fixture.debugElement.query(
			By.directive(FakeListComponent)
		).componentInstance;

		fakeList.requestDetails.emit(99);
		fixture.detectChanges();

		expect(component.fetchPostingDetails).toHaveBeenCalledWith(99);
	});
	it('should trigger editPosting method if emit triggered by child', () => {
		spyOn(component, 'editPosting');
		const fakeDetails: FakeDetailsComponent = fixture.debugElement.query(
			By.directive(FakeDetailsComponent)
		).componentInstance;

		fakeDetails.editPosting.emit({
			id: 100,
			comments: 'test comments',
			price: 9999,
		});
		fixture.detectChanges();

		expect(component.editPosting).toHaveBeenCalledWith({
			id: 100,
			comments: 'test comments',
			price: 9999,
		});
	});
	it('should trigger deletePosting method if emit triggered by child', () => {
		spyOn(component, 'deletePosting');
		const fakeDetails: FakeDetailsComponent = fixture.debugElement.query(
			By.directive(FakeDetailsComponent)
		).componentInstance;

		fakeDetails.deletePosting.emit(99);
		fixture.detectChanges();

		expect(component.deletePosting).toHaveBeenCalledWith(99);
	});
	it('should trigger openCreateModal method if emit triggered by child', () => {
		spyOn(component, 'openCreateModal');
		const fakeSearch: FakeSearchComponent = fixture.debugElement.query(
			By.directive(FakeSearchComponent)
		).componentInstance;

		fakeSearch.create.emit();
		fixture.detectChanges();

		expect(component.openCreateModal).toHaveBeenCalled();
	});
	it('should trigger fetchDeviceList method if emit triggered by child', () => {
		spyOn(component, 'fetchDeviceList');
		const fakeCreate: FakeCreateComponent = fixture.debugElement.query(
			By.directive(FakeCreateComponent)
		).componentInstance;

		fakeCreate.requestDeviceList.emit('search');
		fixture.detectChanges();

		expect(component.fetchDeviceList).toHaveBeenCalledWith('search');
	});
	it('should trigger fetchDeviceDetails method if emit triggered by child', () => {
		spyOn(component, 'fetchDeviceDetails');
		const fakeCreate: FakeCreateComponent = fixture.debugElement.query(
			By.directive(FakeCreateComponent)
		).componentInstance;

		fakeCreate.requestDeviceDetails.emit('key');
		fixture.detectChanges();

		expect(component.fetchDeviceDetails).toHaveBeenCalledWith('key');
	});
	it('should trigger clearDetails method if emit triggered by child', () => {
		spyOn(component, 'clearDetails');
		const fakeCreate: FakeCreateComponent = fixture.debugElement.query(
			By.directive(FakeCreateComponent)
		).componentInstance;

		fakeCreate.clearDetails.emit();
		fixture.detectChanges();

		expect(component.clearDetails).toHaveBeenCalled();
	});
	it('should trigger createPosting method if emit triggered by child', () => {
		spyOn(component, 'createPosting');
		const fakeCreate: FakeCreateComponent = fixture.debugElement.query(
			By.directive(FakeCreateComponent)
		).componentInstance;

		fakeCreate.createPosting.emit(mockPostingPayload);
		fixture.detectChanges();

		expect(component.createPosting).toHaveBeenCalledWith(mockPostingPayload);
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
