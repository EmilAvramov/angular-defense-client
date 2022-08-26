import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices/devices.component';
import { SearchComponent } from './devices/search/search.component';
import { ListComponent } from './devices/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DevicesRoutingModule } from './devices.routing.module';

@NgModule({
	declarations: [DevicesComponent, SearchComponent, ListComponent],
	imports: [CommonModule, DevicesRoutingModule, ReactiveFormsModule],
})
export class DevicesModule {}
