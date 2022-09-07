import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostingsComponent } from './postings/postings.component';
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';

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
