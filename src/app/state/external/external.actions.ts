import { createAction, props } from '@ngrx/store';
import { ExternalDataRequest } from './external.state';

export enum ExternalActionsNames {
	ExternalInit = '[External] Init',
	ExternalInitSuccess = '[External] Init Success',
	ExternalInitFailure = '[External] Init Failure',
}

export const ExternalInit = createAction(ExternalActionsNames.ExternalInit);

export const ExternalInitSuccess = createAction(
	ExternalActionsNames.ExternalInitSuccess,
	props<{ data: ExternalDataRequest }>()
);

export const ExternalInitFailure = createAction(
	ExternalActionsNames.ExternalInitFailure,
	props<{ message: string | null }>()
);
