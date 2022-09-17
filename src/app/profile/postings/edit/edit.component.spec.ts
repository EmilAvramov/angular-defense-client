import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { UserFacade } from 'src/app/state/user/user.facade';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
	let component: EditComponent;
	let fixture: ComponentFixture<EditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EditComponent],
			providers: [UserFacade, provideMockStore({})],
		}).compileComponents();

		fixture = TestBed.createComponent(EditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
