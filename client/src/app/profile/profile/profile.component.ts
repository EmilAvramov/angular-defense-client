import { Component, OnInit } from '@angular/core';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
	public userDetails!: User | null;
	public userPostings!: Posting[] | null;

	constructor(
		private postingFacade: PostingFacade,
		private userFacade: UserFacade
	) {
		this.userFacade.userData$.subscribe({
			next: (data) => this.userDetails = data,
			error: (err) => console.log(err)
		})
		this.postingFacade.getUserPostings$.subscribe({
			next: (data) => this.userPostings = data,
			error: (err) => console.log(err)
		})
		this.postingFacade;
	}

	ngOnInit(): void {}
}
