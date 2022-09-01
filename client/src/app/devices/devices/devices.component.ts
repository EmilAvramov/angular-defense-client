import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { DataService } from '../services/data.service';
import { first } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent implements OnInit, OnDestroy {
	public limit: number = 100;
	public offset: number = 0;
	public data: DeviceDetails[] = [];
	public details: DeviceDetails | undefined;
	public requested: boolean = false;

	constructor(
		private spinner: NgxSpinnerService,
		private dataService: DataService,
		public modal: ModalService
	) {}

	ngOnInit(): void {
		this.offset = 0;
		this.spinner.show();
		this.dataService
			.requestDetailedData(this.limit, this.offset)
			.pipe(first())
			.subscribe({
				next: (value: any) => {
					value.forEach((item: DeviceDetails) => {
						this.data.push(item);
					});
					this.spinner.hide();
				},
				error: (err) => console.log(err.message),
			});
	}

	ngOnDestroy(): void {
		this.details = undefined;
		this.data = [];
	}

	loadMore(): void {
		if (this.requested) {
			this.data = [];
		}
		this.offset += 100;
		this.spinner.show();
		this.dataService
			.requestDetailedData(this.limit, this.offset)
			.pipe(first())
			.subscribe({
				next: (value: any) => {
					value.forEach((item: DeviceDetails) => {
						this.data.push(item);
					});
					this.spinner.hide();
					this.requested = false;
				},
				error: (err) => console.log(err.message),
			});
	}

	query(query: string): void {
		if (query) {
			this.requested = true;
			this.spinner.show();
			this.data = [];
			this.dataService
				.queryData(query)
				.pipe(first())
				.subscribe({
					next: (value: any) => {
						value.forEach((item: DeviceDetails) => {
							this.data.push(item);
						});
						this.spinner.hide();
					},
					error: (err) => console.log(err.message),
				});
		}
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
