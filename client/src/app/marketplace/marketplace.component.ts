import { Component } from '@angular/core';
import { ModalService } from 'src/app/devices/services/modal.service';
import { Device } from 'src/app/state/device/device.state';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting, PostingPayload } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';
import { PostingCreateService } from './services/postingCreate.service';
import { PostingDetailsService } from './services/postingDetails.service';

@Component({
	selector: 'app-marketplace',
	templateUrl: './marketplace.component.html',
	styleUrls: ['./marketplace.component.sass'],
})
export class MarketplaceComponent {
	public limit: number = 18;
	public offset: number = 0;

	public postings!: Posting[] | null;
	public postingDetails!: Posting | null;
	public devices!: Device[] | null;
	public deviceDetails!: Device | null;
	public user!: User | null;

	constructor(
		public postingModal: PostingDetailsService,
		public createModal: PostingCreateService,
		private postingFacade: PostingFacade,
		private userFacade: UserFacade
	) {
		this.postingFacade.postingData$.subscribe({
			next: (data: Posting[] | null) => (this.postings = data),
			error: (err: string | null) => console.log(err),
		});
		this.postingFacade.postingDetails$.subscribe({
			next: (data: Posting | null) => (this.postingDetails = data),
			error: (err: string | null) => console.log(err),
		});
		this.postingFacade.devicesData$.subscribe({
			next: (data: Device[] | null) => (this.devices = data),
			error: (err: string | null) => console.log(err),
		});
		this.postingFacade.deviceDetails$.subscribe({
			next: (data: Device | null) => (this.deviceDetails = data),
			error: (err: string | null) => console.log(err),
		});
		this.userFacade.userData$.subscribe({
			next: (data: User | null) => (this.user = data),
			error: (err: string | null) => console.log(err),
		});
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
		this.postingFacade.getPostingDetails(id);
		this.postingModal.open()
	}

	openCreateModal(): void {
		this.createModal.open();
	}

	fetchDeviceList(query: string): void {
		this.postingFacade.queryDevices(query, 10);
	}

	fetchDeviceDetails(key: string): void {
		this.postingFacade.getDeviceDetails(key);
	}

	clearDetails(): void {
		this.postingFacade.clearDeviceDetails();
	}

	createPosting(data: PostingPayload) {
		this.postingFacade.createPosting(data);
	}
}
