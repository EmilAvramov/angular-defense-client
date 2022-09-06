import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { DevicesComponent } from './devices/devices.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';

const routes: Routes = [
	{
		path: 'marketplace',
		component: MarketplaceComponent,
	},
	{
		path: 'devices',
		component: DevicesComponent,
	},
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledBlocking',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
