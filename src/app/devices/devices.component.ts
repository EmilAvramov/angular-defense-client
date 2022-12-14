import { Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { DeviceFacade } from '../state/device/device.facade';
import { Device } from '../state/device/device.state';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent implements OnDestroy {
	public limit: number = 100;
	public offset: number = 0;
	public data!: Device[] | null;
	public details!: Device | null;
	public completer$: Subject<void> = new Subject<void>();

	constructor(
		private spinner: NgxSpinnerService,
		private deviceFacade: DeviceFacade,
		public modal: ModalService
	) {
		this.deviceFacade.dataLoaded$.pipe(takeUntil(this.completer$)).subscribe({
			next: (loading: boolean) => {
				if (!loading) {
					this.spinner.show();
				} else {
					this.spinner.hide();
				}
			},
			error: (err: string | null) => console.log(err),
		});
		this.deviceFacade.deviceData$.pipe(takeUntil(this.completer$)).subscribe({
			next: (data: Device[] | null) => (this.data = data),
			error: (err: string | null) => console.log(err),
		});
		this.deviceFacade.deviceDetails$.pipe(takeUntil(this.completer$)).subscribe({
			next: (data: Device | null) => (this.details = data),
			error: (err: string | null) => console.log(err),
		});
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

	loadMore(): void {
		this.limit += 100;
		this.deviceFacade.loadMoreDevices(this.limit, this.offset);
	}

	query(query: string): void {
		this.limit = 100;
		if (query) {
			this.deviceFacade.searchDevices(query, this.limit, this.offset);
		} else {
			this.deviceFacade.initDeviceData();
		}
	}

	getDetails(key: string) {
		this.deviceFacade.getDeviceDetails(key);
		this.modal.open();
	}
}
