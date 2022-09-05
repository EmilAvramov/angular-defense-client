import { Component, OnInit } from '@angular/core';
import { DeviceFacade } from './state/device/device.facade';
import { UserFacade } from './state/user/user.facade';
import { PostingFacade } from './state/posting/posting.facade';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
	title = 'angular-defense-project';

	constructor(
		private userFacade: UserFacade,
		private deviceFacade: DeviceFacade,
		private postingFacade: PostingFacade
	) {}

	ngOnInit(): void {
		this.userFacade.initUser();
		this.postingFacade.initPostingsData();
		this.deviceFacade.initDeviceData();
	}
}
