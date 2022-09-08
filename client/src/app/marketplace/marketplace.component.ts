import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
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
export class MarketplaceComponent implements AfterViewInit, OnDestroy {
	public limit: number = 18;
	public offset: number = 0;

	public postings$: Observable<Posting[] | null>;
	public postingDetails$: Observable<Posting | null>;
	public devices$: Observable<Device[] | null>;
	public deviceDetails$: Observable<Device | null>;
	public user$: Observable<User | null>;
	public validatedUser$: Observable<User | null>;

	public completer$: Subject<void> = new Subject<void>();

	constructor(
		public postingModal: PostingDetailsService,
		public createModal: PostingCreateService,
		private postingFacade: PostingFacade,
		private userFacade: UserFacade
	) {
		this.postings$ = this.postingFacade.postingData$;
		this.postingDetails$ = this.postingFacade.postingDetails$;
		this.devices$ = this.postingFacade.devicesData$;
		this.deviceDetails$ = this.postingFacade.deviceDetails$;
		this.user$ = this.userFacade.userData$;
		this.validatedUser$ = this.userFacade.userValidated$;
	}

	ngAfterViewInit(): void {
		this.user$.pipe(
			takeUntil(this.completer$),
			map((data: User | null) => {
				if (data) {
					this.userFacade.validateUser(data.token);
				}
			})
		);
	}

	// Posting modal actions below

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
		this.postingModal.open();
	}

	editPosting(data: any): void {
		this.postingFacade.editPosting(data.id, data.comments, data.price);
		this.postingFacade.initPostingsData();
	}

	deletePosting(id: number): void {
		this.postingFacade.deletePosting(id);
		this.postingFacade.initPostingsData();
	}

	// Create modal methods below

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

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
