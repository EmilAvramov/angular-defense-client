import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/state/user/user.state';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
	public userData: User | null | undefined;

	constructor(private sharedService: SharedService) {
		this.sharedService.userData$.subscribe({
			next: (data) => (this.userData = data),
			error: (err) => console.log(err),
		});
	}

	ngOnInit(): void {}
}
