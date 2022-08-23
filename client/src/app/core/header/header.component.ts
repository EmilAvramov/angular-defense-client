import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { SessionStorage } from 'src/app/shared/tokens/injection-tokens';
import { server } from 'src/app/shared/variables/config';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
	token: string | undefined;
	userSession: object | undefined;

	constructor(
		@Inject(SessionStorage) private session: Window['sessionStorage'],
		private http: HttpClient
	) {
		try {
			this.userSession = this.session;
			this.token = this.session.getItem('token') || undefined;
		} catch {
			this.userSession = undefined;
			this.token = undefined;
		}
	}

	hasToken(): boolean {
		return !!this.token;
	}

	logout(): void {
		this.http
			.post(
				`${server}/users/logout`,
				{ token: this.token as string },
				{
					headers: {
						'content-type': 'application/json',
						'x-authorization': this.token as string,
					},
				}
			)
			.subscribe({
				next: () => {
					sessionStorage.clear()
					this.userSession = undefined
					this.token = undefined
				},
				error: (error) => console.log(error),
			});
	}

	ngOnInit(): void {}
}
