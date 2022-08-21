import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MarketplaceRoutingModule } from './marketplace.routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, MarketplaceRoutingModule],
})
export class MarketplaceModule {}
