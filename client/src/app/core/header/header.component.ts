import { Component, OnInit } from '@angular/core';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
	token: string | undefined;
	auth: boolean | undefined;

	constructor(private readonly userFacade: UserFacade) {
		this.userFacade.userLoaded$.subscribe({
			next: (res) => (this.auth = res),
			error: (err) => console.log(err),
		});
		this.userFacade.userData$.subscribe({
			next: (res) => this.token = res.token,
			error: (err) => console.log(err)
		})
	}

	logout(): void {
		this.userFacade.userLogout(this.token!)
	}

	ngOnInit(): void {}
}
