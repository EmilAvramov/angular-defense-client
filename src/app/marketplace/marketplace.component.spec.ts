import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PostingFacade } from '../state/posting/posting.facade';
import { UserFacade } from '../state/user/user.facade';

import { MarketplaceComponent } from './marketplace.component';

describe('MarketplaceComponent', () => {
	let component: MarketplaceComponent;
	let fixture: ComponentFixture<MarketplaceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MarketplaceComponent],
			providers: [PostingFacade, UserFacade, provideMockStore({})],
		}).compileComponents();

		fixture = TestBed.createComponent(MarketplaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
