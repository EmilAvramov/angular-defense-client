import { HttpClient } from '@angular/common/http';
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
	auth: boolean = !!this.storageService.getToken();

	constructor(private http: HttpClient, public storageService: StorageService) {
		this.token = this.storageService.getToken();
		this.storageService.watchStorage().subscribe({
			next: (value) => {
				if (value === 'added') {
					this.auth = true;
				} else {
					this.auth = false;
				}
			},
		});
	}

	logout(): void {
		this.http
			.post(
				`${server}/users/logout`,
				{ token: this.token },
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
