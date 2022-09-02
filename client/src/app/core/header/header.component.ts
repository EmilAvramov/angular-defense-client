import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { server } from 'src/app/shared/variables/config';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
	token: string | null | undefined;
	auth: boolean = !!this.storageService.getToken();

	constructor(
		public storageService: StorageService,
		private readonly userFacade: UserFacade
	) {
		this.storageService.watchStorage().subscribe({
			next: (value) => {
				if (value === 'added') {
					this.token = this.storageService.getToken();
					this.auth = true;
				} else {
					this.token = undefined;
					this.auth = false;
				}
			},
		});
	}

	logout(): void {
		this.userFacade.accessStorage();
		this.userFacade.userLoaded$.subscribe(console.log)
		this.userFacade.userData$.subscribe(console.log)
		// this.userFacade.userLogout(
		// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlX2F2cmFtb3ZAem9oby5ldSIsInBhc3N3b3JkIjoiJDJiJDEwJERLcUZmTFZvZVRwMHZIWUttOG4xei5OSjJIcGJBNEUyczl6aU1pR2tvMmhvb1BRRElyb1pLIiwiZmlyc3ROYW1lIjoiRW1pbCIsImxhc3ROYW1lIjoiQXZyYW1vdiIsInBob25lIjoiMDg4MzQxMjA3MiIsImFkZHJlc3MiOiJTb2ZpYSIsImNpdHkiOiJTb2ZpYSBDaXR5IiwiaWF0IjoxNjYyMTIxNTU1LCJleHAiOjE2NjIyOTQzNTV9.HgLATRGNZgZQJxhCL4_P953EROKkJScb3xkR_aMfvAg'
		// );
	}

	ngOnInit(): void {
		this.userFacade.storageInit()
	}
}
