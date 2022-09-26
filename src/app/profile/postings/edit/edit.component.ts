import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass'],
})
export class EditComponent {
	public display$!: Observable<boolean>;

	@Input() details$: Observable<Posting | null> | undefined;
	@Output() editPosting = new EventEmitter<{
		id: number;
		comments: string;
		price: number;
	}>();
	@Output() deletePosting = new EventEmitter<number>();

	@ViewChild('comments') comments!: ElementRef<HTMLInputElement>;
	@ViewChild('price') price!: ElementRef<HTMLInputElement>;

	constructor(
		private editModal: ModalService,
		public userFacade: UserFacade
	) {
		this.display$ = this.editModal.watch();
	}

	emitEdit(id: number) {
		this.editPosting.emit({
			id,
			comments: this.comments.nativeElement.value,
			price: Number(this.price.nativeElement.value),
		})
	}

	emitDelete(id: number) {
		this.deletePosting.emit(id);
	}
	close() {
		this.editModal.close();
	}
}
