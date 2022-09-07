import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
	token!: string;

	@ViewChild('dropdown') private dropdown!: ElementRef<HTMLElement>;

	constructor(private readonly userFacade: UserFacade) {
		this.userFacade.userData$.subscribe({
			next: (res) => (this.token = res.token),
			error: (err) => console.log(err),
		});
	}

	logout(): void {
		this.userFacade.logoutUser(this.token!);
	}

	openDropDown() {
		this.dropdown.nativeElement.classList.remove('dropdown__hide');
	}
	closeDropDown() {
		this.dropdown.nativeElement.classList.add('dropdown__hide');
	}
}
