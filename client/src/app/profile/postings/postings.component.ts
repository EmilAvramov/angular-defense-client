import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subject, takeUntil, repeat } from 'rxjs';
import { Posting } from 'src/app/state/posting/posting.state';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-postings',
	templateUrl: './postings.component.html',
	styleUrls: ['./postings.component.sass'],
})
export class PostingsComponent implements OnDestroy {
	public completer$: Subject<void> = new Subject<void>();
	public userPostings$: Observable<Posting[] | null> | undefined;

	constructor(private sharedService: SharedService) {
		this.userPostings$ = this.sharedService.userPostings$.pipe(
			takeUntil(this.completer$)
		);
	}

	editPosting(id: number, comments: string, price: number): void {
		this.sharedService.emitPostingEdit({ id, comments, price });
	}

	deletePosting(id: number): void {
		this.sharedService.emitPostingId(id);
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
