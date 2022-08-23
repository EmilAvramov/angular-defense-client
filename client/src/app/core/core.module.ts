import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core.routing.module';
import { SessionStorage } from '../shared/tokens/injection-tokens';

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		AboutComponent,
		NotFoundComponent,
	],
	imports: [CommonModule, CoreRoutingModule],
	exports: [HeaderComponent, FooterComponent, NotFoundComponent],
	providers: [
		{
			provide: SessionStorage,
			useValue: window.sessionStorage,
		},
	],
})
export class CoreModule {}
