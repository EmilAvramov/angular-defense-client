import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostingsComponent } from './postings/postings.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
	{
		path: 'profile/postings',
		component: PostingsComponent,
	},
	{
		path: 'profile/settings',
		component: SettingsComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
