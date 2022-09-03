import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DeviceFacade } from '../state/device/device.facade';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent implements OnInit {
	public limit: number = 100;
	public offset: number = 0;
	public data: DeviceDetails[] = [];
	public details: DeviceDetails | undefined;
	public requested: boolean = false;

	constructor(
		private spinner: NgxSpinnerService,
		private deviceFacade: DeviceFacade,
		public modal: ModalService
	) {}

	ngOnInit(): void {
		this.spinner.show()
		this.deviceFacade.loadInitialData()
		this.deviceFacade.deviceData$.subscribe({
			next: (response) => {
				this.data = response
				this.spinner.hide()
			},
			error: (err) => console.log(err)
		})
	}

	loadMore(): void {
		if (this.requested) {
			this.data = [];
		}
		this.offset += 100;
		this.spinner.show();
		this.deviceFacade.loadMoreData(this.limit, this.offset)
		this.deviceFacade.deviceData$.subscribe({
			next: (response) => {
				this.data = response
				this.spinner.hide()
			}, 
			error: (err) => console.log(err)
		})
	}

	query(query: string): void {
		// if (query) {
		// 	this.requested = true;
		// 	this.spinner.show();
		// 	this.data = [];
		// 	this.dataService
		// 		.queryData(query)
		// 		.pipe(first())
		// 		.subscribe({
		// 			next: (value: any) => {
		// 				value.forEach((item: DeviceDetails) => {
		// 					this.data.push(item);
		// 				});
		// 				this.spinner.hide();
		// 			},
		// 			error: (err) => console.log(err.message),
		// 		});
		// }
	}

	getDetails(key: string) {
		try {
			this.details = this.data.filter(
				(x: DeviceDetails) => x.deviceKey === key
			)[0];
			this.modal.open();
		} catch (err: any) {
			console.log(err.message);
		}
	}

	clearDetails() {
		this.details = undefined;
	}
}
