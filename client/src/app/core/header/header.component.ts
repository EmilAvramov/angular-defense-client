import { Component, Inject, OnInit } from '@angular/core';
import { SessionStorage } from 'src/app/shared/tokens/injection-tokens';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
	token: string | undefined;

	constructor(
		@Inject(SessionStorage) private session: Window['sessionStorage']
	) {
		try {
			this.token = this.session.getItem('token') || 'ERROR';
		} catch {
			this.token = undefined;
		}
	}

	hasToken(): boolean {
		return !!this.token;
	}

	ngOnInit(): void {}
}
