import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

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
import { StorageService } from './shared/services/storage.service';
import { DevicesModule } from './devices/devices.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),

    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    CoreModule,
    AuthModule,
    MarketplaceModule,
    DevicesModule,
    ProfileModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
