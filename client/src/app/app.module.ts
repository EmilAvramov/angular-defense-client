import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { SharedModule } from './shared/shared.module';
import { DevicesModule } from './devices/devices.module';
import { ProfileModule } from './profile/profile.module';
import { userReducer } from './state/user/user.reducers';
import { UserFacade } from './state/user/user.facade';
import { UserEffects } from './state/user/user.effects';
import { AuthService, StorageService } from './state/user/user.service';
import { DeviceFacade } from './state/device/device.facade';
import { DeviceEffects } from './state/device/device.effects';
import { deviceReducer } from './state/device/device.reducers';
import { DataService } from './state/device/device.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		StoreModule.forRoot({ user: userReducer, device: deviceReducer }, {}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		EffectsModule.forRoot([UserEffects, DeviceEffects]),
		SharedModule,
		HttpClientModule,
		AuthModule,
		MarketplaceModule,
		DevicesModule,
		ProfileModule,
		CoreModule,
		AppRoutingModule,
	],
	providers: [
		StorageService,
		AuthService,
		DataService,
		UserFacade,
		DeviceFacade,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
