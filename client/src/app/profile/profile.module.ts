import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { PostingsComponent } from './postings/postings.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
	declarations: [ProfileComponent, PostingsComponent, SettingsComponent],
	imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
