import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core.routing.module';

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		AboutComponent,
		NotFoundComponent,
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
	exports: [HeaderComponent, FooterComponent, NotFoundComponent],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
