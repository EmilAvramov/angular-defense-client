import {
	Component,
	EventEmitter,
	Input,
	NO_ERRORS_SCHEMA,
	Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
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
	it('should close observables on component destroy', () => {
		const next = spyOn(component.completer$, 'next');
		const complete = spyOn(component.completer$, 'complete');

		fixture.destroy();
		fixture.detectChanges();

		expect(next).toHaveBeenCalled();
		expect(complete).toHaveBeenCalled();
	});
});
