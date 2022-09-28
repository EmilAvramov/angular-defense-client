import {
	Component,
	EventEmitter,
	Input,
	NO_ERRORS_SCHEMA,
	Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { mockPostingPartial } from 'src/app/shared/mockData/postings.mock';
import { Posting } from 'src/app/state/posting/posting.state';
import { EditComponent } from './edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { PostingsComponent } from './postings.component';

@Component({
	selector: 'app-edit',
	template: '',
})
class FakeEditComponent implements Partial<EditComponent> {
	@Input() details$: Observable<Posting | null> | undefined;
	@Output() editPosting = new EventEmitter<{
		id: number;
		comments: string;
		price: number;
	}>();
	@Output() deletePosting = new EventEmitter<number>();
}

describe('PostingsComponent', () => {
	let component: PostingsComponent;
	let fixture: ComponentFixture<PostingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PostingsComponent, FakeEditComponent],
			providers: [
				FormBuilder,
				provideMockStore({}),
				{ provide: MatDialog, useValue: {} },
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(PostingsComponent);
		component = fixture.componentInstance;
		component.userPostings = mockPostingPartial;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should trigger editPosting method if emit triggered by child', () => {
		spyOn(component, 'editPosting');
		const fakeEditComponent: FakeEditComponent = fixture.debugElement.query(
			By.directive(FakeEditComponent)
		).componentInstance;

		fakeEditComponent.editPosting.emit({
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
	it('should trigger deletePosting method on button click', () => {
		component.userPostings = mockPostingPartial;
		fixture.detectChanges();

		spyOn(component, 'deletePosting');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.delete')
		).nativeElement;
		button.click();
		fixture.detectChanges();

		expect(component.deletePosting).toHaveBeenCalledWith(1);
	});
	it('should trigger details request on button click', () => {
		component.userPostings = mockPostingPartial;
		fixture.detectChanges();

		spyOn(component, 'fetchPostingDetails');
		const button: HTMLButtonElement = fixture.debugElement.query(
			By.css('.edit')
		).nativeElement;

		button.click();
		fixture.detectChanges();

		expect(component.fetchPostingDetails).toHaveBeenCalledWith(1);
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
