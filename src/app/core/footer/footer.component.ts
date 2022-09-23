import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
	constructor(private router: Router) {}

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
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
