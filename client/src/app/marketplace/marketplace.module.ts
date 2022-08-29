import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ListComponent } from './marketplace/list/list.component';
import { SearchComponent } from './marketplace/search/search.component';

@NgModule({
  declarations: [MarketplaceComponent, ListComponent, SearchComponent],
  imports: [CommonModule],
})
export class MarketplaceModule {}
