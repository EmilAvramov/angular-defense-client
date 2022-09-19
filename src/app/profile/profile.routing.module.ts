import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { PostingsComponent } from './postings/postings.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
	{
		path: 'profile/postings',
		component: PostingsComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'profile/settings',
		component: SettingsComponent,
		canActivate: [AuthGuardService],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
