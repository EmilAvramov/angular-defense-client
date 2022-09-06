import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Posting } from 'src/app/state/posting/posting.state';
import { User } from 'src/app/state/user/user.state';
import { PostingDetailsService } from '../services/postingDetails.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.sass'],
})
export class DetailsComponent {
	public display$!: Observable<boolean>;

	@Input() details!: Posting | null;
	@Input() user!: User | null

	constructor(private postingModal: PostingDetailsService) {
		this.display$ = this.postingModal.watch();
	}

	close() {
		this.postingModal.close();
	}
}
