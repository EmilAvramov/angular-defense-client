import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthRoutingModule } from './auth.routing.module';
import { BooksEffects } from '../state/user/user.effects';
import { UserFacade } from '../state/user/user.facade';
import { storageReducer, userReducer } from '../state/user/user.reducers';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { STORAGE_FEATURE_KEY, USER_FEATURE_KEY } from '../state/user/user.state';
import { environment } from 'src/environments/environment';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		StoreModule.forRoot({}),
		StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
		StoreModule.forFeature(STORAGE_FEATURE_KEY, storageReducer),
		EffectsModule.forRoot([BooksEffects]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	providers: [Storage, UserFacade],
})
export class AuthModule {}
