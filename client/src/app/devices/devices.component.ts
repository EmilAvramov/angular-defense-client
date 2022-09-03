import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DeviceFacade } from '../state/device/device.facade';
import { Device } from '../state/device/device.state';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent implements OnInit {
	public limit: number = 100;
	public offset: number = 0;
	public data!: Device[] | null;
	public details!: Device | null;

	constructor(
		private spinner: NgxSpinnerService,
		private deviceFacade: DeviceFacade,
		public modal: ModalService
	) {}

	ngOnInit(): void {
		this.deviceFacade.loadInitialData();
		this.deviceFacade.deviceData$.subscribe({
			next: (response) => {
				this.data = response;
				this.spinner.hide();
			},
			error: (err) => console.log(err),
		});
	}

	loadMore(): void {
		this.offset += 100;
		this.spinner.show();
		this.deviceFacade.loadMoreData(this.limit, this.offset);
	}

	query(query: string): void {
		this.spinner.show();
		this.offset = -100;
		this.deviceFacade.queryData(query, this.limit, this.offset);
	}

	getDetails(key: string) {
		this.deviceFacade.getDetails(key);
		this.deviceFacade.deviceDetails$.subscribe({
			next: (response) => {
				this.details = response;
				this.modal.open();
			},
			error: (err) => console.log(err),
		});
	}

	clearDetails() {
		this.details = null;
	}
}
