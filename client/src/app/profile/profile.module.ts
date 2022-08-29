import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { PostingsComponent } from './profile/postings/postings.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
	declarations: [ProfileComponent, PostingsComponent, SettingsComponent],
	imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
