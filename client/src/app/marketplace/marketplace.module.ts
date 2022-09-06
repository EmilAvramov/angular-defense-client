import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarketplaceComponent } from './marketplace.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';

import { NgxSpinnerModule } from 'ngx-spinner';
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
})
export class MarketplaceModule {}
