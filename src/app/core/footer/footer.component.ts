import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.sass'],
})
export class FooterComponent implements OnDestroy{

	token!: string;

	public completer$: Subject<void> = new Subject<void>();

	constructor(private router: Router, private readonly userFacade: UserFacade) {
		this.userFacade.userData$.pipe(takeUntil(this.completer$)).subscribe({
			next: (res) => (this.token = res.token),
			error: (err) => console.log(err),
		});
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	createNav() {
		let location: string = window.location.href.split('/')[3];
		if (location === 'create') {
			this.scrollToTop();
		} else {
			this.router.navigate(['/create']);
			window.scroll(0, 0);
		}
	}

	marketNav() {
		let location: string = window.location.href.split('/')[3];
		if (location === 'marketplace') {
			this.scrollToTop();
		} else {
			this.router.navigate(['/marketplace']);
			window.scroll(0, 0);
		}
	}

	mapNav(current: string) {
		let location: string = window.location.href.split('/')[3];
		if (location === current) {
			this.scrollToTop();
		} else {
			this.router.navigate([current]);
			window.scroll(0, 0);
		}
	}

	logoNavigate() {
		let location: string = window.location.href.split('/')[3];
		if (location) {
			this.router.navigate(['/']);
			window.scroll(0, 0);
		} else {
			this.scrollToTop();
		}
	}
}
