import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';
import { ModalService } from '../services/modal.service';

@Component({
	selector: 'app-marketplace',
	templateUrl: './marketplace.component.html',
	styleUrls: ['./marketplace.component.sass'],
})
export class MarketplaceComponent implements AfterViewInit, OnDestroy {
	public limit: number = 18;
	public offset: number = 0;
	public completer$: Subject<void> = new Subject<void>();

	public postings$: Observable<Posting[] | null>;
	public postingDetails$: Observable<Posting | null>;
	public user$: Observable<User | null>;
	public validatedUser$: Observable<User | null>;

	constructor(
		public postingModal: ModalService,
		private postingFacade: PostingFacade,
		private userFacade: UserFacade,
		private spinner: NgxSpinnerService
	) {
		this.postings$ = this.postingFacade.postingData$;
		this.postingDetails$ = this.postingFacade.postingDetails$;
		this.user$ = this.userFacade.userData$;
		this.validatedUser$ = this.userFacade.userValidated$;
	}

	ngAfterViewInit(): void {
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
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

	searchPostings(query: string): void {
		this.limit = 18;
		this.postingFacade.queryPostings(query, this.limit, this.offset);
	}

	loadMorePostings(): void {
		this.limit += 18;
		this.postingFacade.loadMorePostings(this.limit, this.offset);
	}

	fetchPostingDetails(id: number): void {
		this.postingFacade.getPostingDetails(id);
		this.postingModal.open();
	}

	editPosting(data: any): void {
		this.postingFacade.editPosting(data.id, data.comments, data.price);
		this.postingFacade.initPostingsData();
	}

	deletePosting(id: number): void {
		this.postingFacade.deletePosting(id);
		this.postingFacade.initPostingsData();
	}
}
