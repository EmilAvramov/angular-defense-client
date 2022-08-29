import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './profile/favourites/favourites.component';
import { PostingsComponent } from './profile/postings/postings.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './profile/settings/settings.component';

const routes: Routes = [
	{
		path: 'profile',
		component: ProfileComponent,
		children: [
			{
				path: '',
				redirectTo: 'postings',
				pathMatch: 'full'
			},
			{
				path: 'postings',
				component: PostingsComponent,
			},
			{
				path: 'settings',
				component: SettingsComponent,
			},
			{
				path: 'favourites',
				component: FavouritesComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
