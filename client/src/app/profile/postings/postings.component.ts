import { Component, OnDestroy } from '@angular/core';
import { map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-postings',
	templateUrl: './postings.component.html',
	styleUrls: ['./postings.component.sass'],
})
export class PostingsComponent implements OnDestroy {
	public userPostings!: Posting[] | null;

	public completer$: Subject<void> = new Subject<void>();

	constructor(
		private userFacade: UserFacade,
		private postingFacade: PostingFacade
	) {
		this.userFacade.userData$
			.pipe(
				takeUntil(this.completer$),
				switchMap(({ id }) =>
					this.postingFacade.postingData$.pipe(
						map((data: Posting[] | null) => {
							if (data) {
								return (this.userPostings = data!.filter(
									(x: Posting) => x.User!.id === id
								));
							}
							return null;
						})
					)
				)
			)

			.subscribe();
	}

	editPosting(id: number, comments: string, price: number): void {}

	deletePosting(id: number): void {}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
