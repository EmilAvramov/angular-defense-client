import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { server } from 'src/app/shared/variables/config';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
	token: string | null;
	userSession: object | undefined;

	constructor(private http: HttpClient, private storageService: StorageService) {
		this.storageService.watchStorage().subscribe({
			next: () => this.hasToken(),
		});
		this.token = this.storageService.getToken();
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
				next: () => this.storageService.clearStorage(),
				error: (error) => console.log(error),
			});
	}

	ngOnInit(): void {}
}
