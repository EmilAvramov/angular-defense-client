import { Component, OnInit } from '@angular/core';
import { Device, DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { UserDetails } from 'src/app/shared/interfaces/User.interface';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-marketplace',
	templateUrl: './marketplace.component.html',
	styleUrls: ['./marketplace.component.sass'],
})
export class MarketplaceComponent implements OnInit {
	public device: DeviceDetails | undefined;
	public user: UserDetails | undefined;
	public postingData: any

	constructor(
		private dataService: DataService,
		private StorageService: StorageService,
		public modal: ModalService
	) {}

	ngOnInit(): void {
		this.postingData = this.dataService.getPostingData()
	}

	setUser(): void {
		this.user = this.StorageService.getAllData();
		this.modal.open()
	}

	loadPostings(): void {
		this.postingData = this.dataService.getPostingData()
	}

	loadDevice(): void {

	}

	clearDetails(): void {
		this.user = undefined
		this.device = undefined
	}


}
