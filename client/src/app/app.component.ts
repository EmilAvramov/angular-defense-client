import { Component, OnInit } from '@angular/core';
import { UserFacade } from './state/user/user.facade';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
	title = 'angular-defense-project';

	constructor(private userFacade: UserFacade) {}

	ngOnInit(): void {
		this.userFacade.userInit();
	}
}
