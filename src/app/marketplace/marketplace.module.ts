import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MarketplaceComponent } from './marketplace.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
	declarations: [
		MarketplaceComponent,
		ListComponent,
		SearchComponent,
		CreateComponent,
		DetailsComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MarketplaceModule {}
