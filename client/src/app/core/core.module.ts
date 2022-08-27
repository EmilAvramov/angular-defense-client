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
import { SessionStorage } from '../shared/tokens/injection-tokens';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from '../shared/services/modal.service';

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		AboutComponent,
		NotFoundComponent,
		ModalComponent,
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
	exports: [HeaderComponent, FooterComponent, NotFoundComponent, ModalComponent],
	providers: [
		{
			provide: SessionStorage,
			useValue: window.sessionStorage,
		},
		ModalService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
