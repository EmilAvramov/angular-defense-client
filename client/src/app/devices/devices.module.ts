import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DevicesComponent } from './devices/devices.component';
import { SearchComponent } from './devices/search/search.component';
import { ListComponent } from './devices/list/list.component';
import { DataService } from './services/data.service';
import { ModalComponent } from './devices/modal/modal.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [
		DevicesComponent,
		SearchComponent,
		ListComponent,
		ModalComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
	providers: [DataService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DevicesModule {}
