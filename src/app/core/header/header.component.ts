import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnDestroy {
	token!: string;

	public completer$: Subject<void> = new Subject<void>();

	constructor(private readonly userFacade: UserFacade) {
		this.userFacade.userData$.pipe(takeUntil(this.completer$)).subscribe({
			next: (res) => (this.token = res.token),
			error: (err) => console.log(err),
		});
	}
	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

	logout(): void {
		this.userFacade.logoutUser(this.token!);
	}
}
