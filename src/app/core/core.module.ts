import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreRoutingModule } from './core.routing.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FaqComponent } from './about/faq.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ConfirmDialog } from './confirm/confirm.component';

import { MatDialog } from '@angular/material/dialog';

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		FaqComponent,
		NotFoundComponent,
		CreateComponent,
		ConfirmDialog,
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		BrowserAnimationsModule,
	],
	exports: [HeaderComponent, FooterComponent, NotFoundComponent, ConfirmDialog],
	providers: [MatDialog],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
