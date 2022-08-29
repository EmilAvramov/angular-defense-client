import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { PostingsComponent } from './profile/postings/postings.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { FavouritesComponent } from './profile/favourites/favourites.component';

@NgModule({
	declarations: [
		ProfileComponent,
		PostingsComponent,
		SettingsComponent,
		FavouritesComponent,
	],
	imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
