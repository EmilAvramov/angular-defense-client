import { Component, OnInit } from '@angular/core';
import { DeviceFacade } from './state/device/device.facade';
import { UserFacade } from './state/user/user.facade';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
	title = 'angular-defense-project';

	constructor(
		private userFacade: UserFacade,
		private deviceFacade: DeviceFacade
	) {}

	ngOnInit(): void {
		this.userFacade.initUser();
		this.deviceFacade.initDeviceData();
	}
}
