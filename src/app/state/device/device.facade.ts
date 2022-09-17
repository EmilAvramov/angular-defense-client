import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as deviceSelectors from './device.selectors';
import * as deviceActions from './device.actions';
import { Device, DeviceState } from './device.state';

@Injectable({ providedIn: 'root' })
export class DeviceFacade {
	constructor(private readonly store: Store<DeviceState>) {}

	public readonly deviceData$: Observable<Device[] | null> = this.store.pipe(
		select(deviceSelectors.getDevices)
	);

	public readonly dataLoaded$: Observable<boolean> = this.store.pipe(
		select(deviceSelectors.getDeviceLoaded)
	);

	public readonly dataError$: Observable<any> = this.store.pipe(
		select(deviceSelectors.getDevicesError)
	);

	public readonly deviceDetails$: Observable<Device | null> = this.store.pipe(
		select(deviceSelectors.getActiveDetails)
	);

	public initDeviceData(): void {
		this.store.dispatch(deviceActions.DeviceInit({ limit: 100, offset: 0 }));
	}

	public loadMoreDevices(limit: number, offset: number): void {
		this.store.dispatch(deviceActions.DeviceLoadMore({ limit, offset }));
	}

	public searchDevices(query: string, limit: number, offset: number): void {
		this.store.dispatch(deviceActions.DeviceSearch({ query, limit, offset }));
	}

	public getDeviceDetails(key: string): void {
		this.store.dispatch(deviceActions.DeviceGetDetails({ key }));
	}
}
