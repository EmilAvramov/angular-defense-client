import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of } from 'rxjs';

import * as ExternalActions from './external.actions';
import { ExternalActionsNames } from './external.actions';
import { Error, ExternalDataRequest } from './external.state';
import { ExternalService } from './external.service';

@Injectable()
export class DeviceEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly externalServce: ExternalService
	) {}

	public readonly getData$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(ExternalActionsNames.ExternalInit),
			map(() => ExternalActions.ExternalInit()),
			switchMap(() =>
				this.externalServce.getData().pipe(
					map((data: ExternalDataRequest) =>
						ExternalActions.ExternalInitSuccess({ data })
					),
					catchError((error: Error) =>
						of(ExternalActions.ExternalInitFailure({ message: error.error.message }))
					)
				)
			)
		)
	);
}
