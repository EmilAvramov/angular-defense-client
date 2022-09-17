import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { UserFacade } from 'src/app/state/user/user.facade';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
	let component: DetailsComponent;
	let fixture: ComponentFixture<DetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DetailsComponent],
			providers: [UserFacade, provideMockStore({})],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
