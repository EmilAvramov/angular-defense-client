import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EditModalService {
	private display: BehaviorSubject<boolean> = new BehaviorSubject(false);

	watch(): Observable<boolean> {
		return this.display.asObservable();
	}

	open() {
		this.display.next(true);
	}

	close() {
		this.display.next(false);
	}
}
