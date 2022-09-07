import { Component, OnInit } from '@angular/core';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';
import { SharedService } from './services/shared.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
	constructor(
		private postingFacade: PostingFacade,
		private userFacade: UserFacade,
		private sharedService: SharedService
	) {
		this.userFacade.userData$.subscribe({
			next: (data: User | null) => {
				if (data) {
					this.postingFacade.loadUserPostings(data.id);
					this.sharedService.emitUserData(data);
				}
			},
			error: (err) => console.log(err),
		});
		this.postingFacade.getUserPostings$.subscribe({
			next: (data: Posting[] | null) => {
				this.sharedService.emitPostingData(data);
			},
			error: (err) => console.log(err),
		});
	}

	ngOnInit(): void {}
}
