import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { FaqComponent } from './about/faq.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
	},
	{
		path: 'create',
		component: CreateComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'faq',
		component: FaqComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CoreRoutingModule {}
