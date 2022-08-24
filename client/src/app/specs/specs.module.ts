import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { SpecsRoutingModule } from './specs.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BrowseComponent],
  imports: [CommonModule, SpecsRoutingModule, ReactiveFormsModule],
})
export class SpecsModule {}
