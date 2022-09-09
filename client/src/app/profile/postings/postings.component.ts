import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-postings',
	templateUrl: './postings.component.html',
	styleUrls: ['./postings.component.sass'],
})
export class PostingsComponent implements OnDestroy {
	public userPostings$: Observable<Posting[] | null> | undefined;
	public completer$: Subject<void> = new Subject<void>();

	constructor(
		private userFacade: UserFacade,
		private postingFacade: PostingFacade
	) {}

	editPosting(id: number, comments: string, price: number): void {}

	deletePosting(id: number): void {}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
