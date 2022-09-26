import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PostingsComponent } from './postings/postings.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { EditComponent } from './postings/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../services/modal.service';

@NgModule({
	declarations: [PostingsComponent, SettingsComponent, EditComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
	],
	providers: [ModalService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
