import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Posting } from 'src/app/state/posting/posting.state';
import { User } from 'src/app/state/user/user.state';

@Injectable()
export class SharedService {
	private emitChanges = new Subject<any>();
	private userPostings = new Subject<Posting[] | null>();
	private userData = new Subject<User | null>();

	changeEmitted$ = this.emitChanges.asObservable();
	userPostings$ = this.userPostings.asObservable();
	userData$ = this.userData.asObservable();

	emitChange(change: any) {
		this.emitChanges.next(change);
	}

	emitPostingData(data: Posting[] | null) {
		this.userPostings.next(data);
	}

	emitUserData(data: User | null) {
		this.userData.next(data);
	}
}
