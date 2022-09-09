import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnDestroy {
	public completer$: Subject<void> = new Subject<void>();

	constructor() {
	}

	ngOnDestroy(): void {
		this.completer$.next();
		this.completer$.complete();
	}
}
