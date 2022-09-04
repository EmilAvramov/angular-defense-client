import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DeviceFacade } from '../state/device/device.facade';
import { Device } from '../state/device/device.state';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent {
	public limit: number = 100;
	public offset: number = 0;
	public data!: Device[] | null;
	public details!: Device | null;

	constructor(
		private spinner: NgxSpinnerService,
		private deviceFacade: DeviceFacade,
		public modal: ModalService
	) {
		this.deviceFacade.dataLoaded$.subscribe({
			next: (loading) => {
				if (!loading) {
					this.spinner.show();
				} else {
					this.spinner.hide();
				}
			},
			error: (err) => console.log(err),
		});
		this.deviceFacade.deviceData$.subscribe({
			next: (data) => (this.data = data),
			error: (err) => console.log(err),
		});
		this.deviceFacade.deviceDetails$.subscribe({
			next: (data) => (this.details = data),
			error: (err) => console.log(err),
		});
	}

	loadMore(): void {
		this.offset += 100;
		this.deviceFacade.loadMoreData(this.limit, this.offset);
	}

	query(query: string): void {
		this.offset = -100;
		this.deviceFacade.queryData(query, this.limit, this.offset);
	}

	getDetails(key: string) {
		this.deviceFacade.getDetails(key);
		this.modal.open();
	}
}
