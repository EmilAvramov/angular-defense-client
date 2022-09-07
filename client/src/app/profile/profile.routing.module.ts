import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
				pathMatch: 'full',
			},
			{
				path: 'postings',
				component: PostingsComponent,
			},
			{
				path: 'settings',
				component: SettingsComponent,
			}
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
