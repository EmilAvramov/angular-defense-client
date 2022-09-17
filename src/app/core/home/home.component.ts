import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { ExternalFacade } from 'src/app/state/external/external.facade';
import {
	LatestDevice,
	PopularDevice,
} from 'src/app/state/external/external.state';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnDestroy {
	latest!: Observable<LatestDevice[] | null>;
	popular!: Observable<PopularDevice[] | null>;

	public completer$: Subject<void> = new Subject<void>();

	constructor(
		private spinner: NgxSpinnerService,
		private externalFacade: ExternalFacade
	) {
		this.externalFacade.dataLoaded$.pipe(takeUntil(this.completer$)).subscribe({
			next: (loading: boolean) => {
				if (!loading) {
					this.spinner.show();
				} else {
					this.spinner.hide();
				}
			},
			error: (err: string | null) => console.log(err),
		});
		this.latest = this.externalFacade.getLatest$;
		this.popular = this.externalFacade.getPopular$;
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
