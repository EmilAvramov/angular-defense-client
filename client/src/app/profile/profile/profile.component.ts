import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { PostingFacade } from 'src/app/state/posting/posting.facade';
import { Posting } from 'src/app/state/posting/posting.state';
import { UserFacade } from 'src/app/state/user/user.facade';
import { User } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
	public userDetails!: User | null;
	public userPostings!: Posting[] | null;

	constructor(
		private postingFacade: PostingFacade,
		private userFacade: UserFacade
	) {
		this.userFacade.userData$.subscribe({
			next: (data) => {
				this.userDetails = data;
				this.postingFacade.loadUserPostings(data.id);
			},
			error: (err) => console.log(err),
		});
		this.postingFacade.getUserPostings$.subscribe({
			next: (data) => {
				this.userPostings = data;
				console.log(data);
			},
			error: (err) => console.log(err),
		});
	}
	ngAfterViewInit(): void {
		console.log(this.userPostings);
	}

	ngOnInit(): void {}
}
