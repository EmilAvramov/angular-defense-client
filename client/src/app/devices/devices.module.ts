import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices/devices.component';
import { SearchComponent } from './devices/search/search.component';
import { ListComponent } from './devices/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DevicesRoutingModule } from './devices.routing.module';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [DevicesComponent, SearchComponent, ListComponent],
	imports: [
		CommonModule,
		DevicesRoutingModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
	providers: [DataService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DevicesModule {}
