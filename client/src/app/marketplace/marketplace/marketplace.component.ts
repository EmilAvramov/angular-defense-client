import { Component, OnInit } from '@angular/core';
import { DeviceDetails } from 'src/app/shared/interfaces/Devices.interface';
import { DevicePosting } from 'src/app/shared/interfaces/Posting.interface';
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
	public details: DeviceDetails[] | undefined;
	public user: UserDetails | undefined;
	public postingData: DevicePosting[] | undefined;

	constructor(
		private dataService: DataService,
		private StorageService: StorageService,
		public modal: ModalService
	) {}

	ngOnInit(): void {
		this.dataService.getPostingData().subscribe({
			next: (res) => (this.postingData = res),
			error: (err) => console.log(err.message),
		});
	}

	openModal(): void {
		this.modal.open();
	}

	loadPostings(query: string): void {
		this.dataService.getPostingData(query).subscribe({
			next: (res) => (this.postingData = res),
			error: (err) => console.log(err.message),
		});
	}

	loadDevice(query: string): void {
		this.dataService.getDeviceDetails(query).subscribe({
			next: (res) => {
				this.details = res;
				this.user = this.StorageService.getAllData();
			},
			error: (err) => console.log(err.message),
		});
	}

	addPosting(data: DevicePosting) {
		this.dataService.createPosting(data).subscribe({
			next: (res) => console.log(res),
			error: (err) => console.log(err),
		});
	}

	clearDetails(): void {
		this.user = undefined;
	}
}
