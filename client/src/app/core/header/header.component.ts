import { Component } from '@angular/core';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
	token!: string;

	constructor(private readonly userFacade: UserFacade) {
		this.userFacade.userData$.subscribe({
			next: (res) => (this.token = res.token),
			error: (err) => console.log(err),
		});
	}

	logout(): void {
		this.userFacade.logoutUser(this.token!);
	}
}
