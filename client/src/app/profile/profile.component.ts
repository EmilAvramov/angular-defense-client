import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	ActivatedRoute,
	ChildActivationEnd,
	NavigationEnd,
	Router,
} from '@angular/router';
import { buffer, filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
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
export class ProfileComponent implements OnInit, OnDestroy {
	public completer$: Subject<void> = new Subject<void>();

	constructor(
		private postingFacade: PostingFacade,
		private userFacade: UserFacade,
		private sharedService: SharedService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.router.events
			.pipe(
				filter(
					(e) =>
						e instanceof ChildActivationEnd &&
						e.snapshot.component === this.route.component
				),
				buffer(this.router.events.pipe(filter((e) => e instanceof NavigationEnd))),
				switchMap(() =>
					this.userFacade.userData$.pipe(
						takeUntil(this.completer$),
						map((data: User) => {
							this.postingFacade.loadUserPostings(data.id),
								this.sharedService.emitUserData(data);
						})
					)
				),
				switchMap(() =>
					this.postingFacade.getUserPostings$.pipe(
						takeUntil(this.completer$),
						map((data: Posting[] | null) => this.sharedService.emitPostingData(data))
					)
				)
			)
			.subscribe();
	}
	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

	ngOnInit(): void {}
}
