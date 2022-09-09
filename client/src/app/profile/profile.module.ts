import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostingsComponent } from './postings/postings.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
	declarations: [PostingsComponent, SettingsComponent],
	imports: [CommonModule, ProfileRoutingModule],
	providers: [],
})
export class ProfileModule {}
