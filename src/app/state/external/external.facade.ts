import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as externalSelectors from './external.selectors';
import * as externalActions from './external.actions';
import { ExternalState, LatestDevice, PopularDevice } from './external.state';

@Injectable({ providedIn: 'root' })
export class ExternalFacade {
	constructor(private readonly store: Store<ExternalState>) {}

	public readonly getLatest$: Observable<LatestDevice[] | null> =
		this.store.pipe(select(externalSelectors.getLatest));

	public readonly getPopular$: Observable<PopularDevice[] | null> =
		this.store.pipe(select(externalSelectors.getPopular));

	public readonly dataLoaded$: Observable<boolean> = this.store.pipe(
		select(externalSelectors.getExternalLoaded)
	);

	public readonly dataError$: Observable<any> = this.store.pipe(
		select(externalSelectors.getExternalsError)
	);

	public initExternalData(): void {
		this.store.dispatch(externalActions.ExternalInit());
	}
}
