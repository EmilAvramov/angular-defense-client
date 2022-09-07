import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';
import { PostingDetailsService } from '../services/postingDetails.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.sass'],
})
export class DetailsComponent {
	public display$!: Observable<boolean>;

	@Input() details!: Posting | null;
	@Input() validatedUser!: User | null;
	@Output() editPosting = new EventEmitter<{
		id: number;
		comments: string;
		price: number;
	}>();
	@Output() deletePosting = new EventEmitter<number>();

	@ViewChild('comments') comments!: ElementRef<HTMLInputElement>;
	@ViewChild('price') price!: ElementRef<HTMLInputElement>;

	constructor(
		private postingModal: PostingDetailsService,
		public userFacade: UserFacade
	) {
		this.display$ = this.postingModal.watch();
	}

	emitEdit() {
		this.editPosting.emit({
			id: this.details!.id,
			comments: this.comments.nativeElement.value,
			price: Number(this.price.nativeElement.value),
		});
	}

	emitDelete() {
		this.deletePosting.emit(this.details!.id);
	}

	close() {
		this.postingModal.close();
	}
}