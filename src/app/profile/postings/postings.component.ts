import { Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-postings',
	templateUrl: './postings.component.html',
	styleUrls: ['./postings.component.sass'],
})
export class PostingsComponent implements OnDestroy {
	public userPostings!: Posting[] | null;
	public postingDetails$: Observable<Posting | null>;

	public completer$: Subject<void> = new Subject<void>();

	constructor(
		private userFacade: UserFacade,
		private postingFacade: PostingFacade,
		private editModal: ModalService,
		private spinner: NgxSpinnerService
	) {
		this.postingFacade.dataLoaded$.pipe(takeUntil(this.completer$)).subscribe({
			next: (loading: boolean) => {
				if (!loading) {
					this.spinner.show();
				} else {
					this.spinner.hide();
				}
			},
			error: (err: string | null) => console.log(err),
		});
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
		this.postingDetails$ = this.postingFacade.postingDetails$;
	}

	editPosting(data: any): void {
		this.postingFacade.editPosting(data.id, data.comments, data.price);
		this.postingFacade.initPostingsData()
	}

	deletePosting(id: number): void {
		this.postingFacade.deletePosting(id);
	}

	fetchPostingDetails(id: number): void {
		this.postingFacade.getPostingDetails(id);
		this.editModal.open();
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
