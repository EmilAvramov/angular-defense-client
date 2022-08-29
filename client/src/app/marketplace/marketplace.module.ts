import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ListComponent } from './marketplace/list/list.component';
import { SearchComponent } from './marketplace/search/search.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [MarketplaceComponent, ListComponent, SearchComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
})
export class MarketplaceModule {}
