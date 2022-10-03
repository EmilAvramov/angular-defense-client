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
import { Posting } from '../state/posting/posting.state';
import { User } from '../state/user/user.state';
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
	selector: 'app-details',
	template: '',
})
class FakeDetailsComponent implements Partial<DetailsComponent> {
	@Input() details$: Observable<Posting | null> | undefined;
	@Input() validatedUser$: Observable<User | null> | undefined;
	@Output() editPosting = new EventEmitter<null>();
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
		spyOn(component, 'createEditModal');
		const fakeDetails: FakeDetailsComponent = fixture.debugElement.query(
			By.directive(FakeDetailsComponent)
		).componentInstance;

		fakeDetails.editPosting.emit();
		fixture.detectChanges();

		expect(component.createEditModal).toHaveBeenCalledWith();
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
	it('should close observables on component destroy', () => {
		const next = spyOn(component.completer$, 'next');
		const complete = spyOn(component.completer$, 'complete');

		fixture.destroy();
		fixture.detectChanges();

		expect(next).toHaveBeenCalled();
		expect(complete).toHaveBeenCalled();
	});
});
