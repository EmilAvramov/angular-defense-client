import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/state/user/user.state';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnDestroy {
	public userData: User | null | undefined;
	public completer$: Subject<void> = new Subject<void>();

	constructor(private sharedService: SharedService) {
		this.sharedService.userData$.pipe(takeUntil(this.completer$)).subscribe({
			next: (data) => (this.userData = data),
			error: (err) => console.log(err),
		});
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
