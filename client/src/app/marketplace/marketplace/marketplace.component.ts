import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Device } from 'src/app/state/device/device.state';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting, PostingPayload } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-marketplace',
	templateUrl: './marketplace.component.html',
	styleUrls: ['./marketplace.component.sass'],
})
export class MarketplaceComponent implements OnInit {
	public limit: number = 18;
	public offset: number = 0;

	public postings!: Posting[] | null;
	public postingDetails!: Posting | null;
	public devices!: Device[] | null;
	public deviceDetails!: Device | null;
	public user!: User | null;

	constructor(
		public modal: ModalService,
		private postingFacade: PostingFacade,
		private userFacade: UserFacade
	) {}

	ngOnInit(): void {
		this._streamPostingData();
	}

	searchPostings(query: string): void {
		this.limit = 18;
		this.postingFacade.queryPostings(query, this.limit, this.offset);
	}

	loadMorePostings(): void {
		this.limit += 18;
		this.postingFacade.loadMorePostings(this.limit, this.offset);
	}

	fetchPostingDetails(id: number): void {
		this._streamPostingDetails(id);
	}

	openModal(): void {
		this.modal.open();
	}

	fetchDeviceList(query: string): void {
		this._streamDeviceData(query);
	}

	fetchDeviceDetails(key: string): void {
		this._streamDeviceDetails(key)
	}

	clearDetails(): void {
		this.postingFacade.clearDeviceDetails();
	}

	createPosting(data: PostingPayload) {
		this.postingFacade.createPosting(data);
	}


	// Private methods below to help with component clutter

	_streamPostingData(): void {
		this.postingFacade.postingData$.subscribe({
			next: (data: Posting[] | null) => (this.postings = data),
			error: (err: string | null) => console.log(err),
		});
	}

	_streamPostingDetails(id: number): void {
		this.postingFacade.postingDetails$.subscribe({
			next: (data: Posting | null) => (this.postingDetails = data),
			error: (err: string | null) => console.log(err),
		});
		this.postingFacade.getPostingDetails(id);
	}

	_streamDeviceData(query: string): void {
		this.postingFacade.devicesData$.subscribe({
			next: (data: Device[] | null) => (this.devices = data),
			error: (err: string | null) => console.log(err),
		});
		this.postingFacade.queryDevices(query, 10);
	}

	_streamDeviceDetails(key:string): void {
		this.postingFacade.deviceDetails$.subscribe({
			next: (data: Device | null) => (this.deviceDetails = data),
			error: (err: string | null) => console.log(err),
		});
		this.userFacade.userData$.subscribe({
			next: (data: User | null) => (this.user = data),
			error: (err: string | null) => console.log(err),
		});
		this.postingFacade.getDeviceDetails(key);
	}
}
