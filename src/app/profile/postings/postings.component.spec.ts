import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { UserFacade } from 'src/app/state/user/user.facade';

import { PostingsComponent } from './postings.component';

describe('PostingsComponent', () => {
	let component: PostingsComponent;
	let fixture: ComponentFixture<PostingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostingsComponent],
			providers: [PostingFacade, UserFacade, FormBuilder, provideMockStore({})],
		}).compileComponents();

		fixture = TestBed.createComponent(PostingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
