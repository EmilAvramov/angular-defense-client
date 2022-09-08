import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Posting } from 'src/app/state/posting/posting.state';
import { User } from 'src/app/state/user/user.state';

@Injectable()
export class SharedService {
	private emitChanges = new Subject<any>();
	private userPostings = new Subject<Posting[] | null>();
	private userData = new Subject<User | null>();
	private postingId = new Subject<number>();
	private postingEdit = new Subject<{
		id: number;
		comments: string;
		price: number;
	}>();

	changeEmitted$ = this.emitChanges.asObservable();
	userPostings$ = this.userPostings.asObservable();
	userData$ = this.userData.asObservable();
	postingId$ = this.postingId.asObservable();
	postingEdit$ = this.postingEdit.asObservable();

	emitChange(change: any) {
		this.emitChanges.next(change);
	}

	emitPostingData(data: Posting[] | null) {
		this.userPostings.next(data);
	}

	emitUserData(data: User | null) {
		this.userData.next(data);
	}

	emitPostingId(data: number) {
		this.postingId.next(data);
	}

	emitPostingEdit(data: { id: number; comments: string; price: number }) {
		this.postingEdit.next(data);
	}
}
