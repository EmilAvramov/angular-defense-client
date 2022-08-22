import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { SpecsRoutingModule } from './specs.routing.module';

@NgModule({
  declarations: [BrowseComponent],
  imports: [CommonModule, SpecsRoutingModule],
})
export class SpecsModule {}
