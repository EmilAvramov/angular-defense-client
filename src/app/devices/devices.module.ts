import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DevicesComponent } from './devices.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalService } from '../services/modal.service';

@NgModule({
	declarations: [
		DevicesComponent,
		SearchComponent,
		ListComponent,
		DetailsComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
	providers: [FormBuilder, ModalService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DevicesModule {}
