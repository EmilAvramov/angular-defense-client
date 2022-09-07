import { Component, OnInit } from '@angular/core';
import { Posting } from 'src/app/state/posting/posting.state';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-postings',
	templateUrl: './postings.component.html',
	styleUrls: ['./postings.component.sass'],
})
export class PostingsComponent implements OnInit {
	public userPostings: Posting[] | null | undefined;

	constructor(private sharedService: SharedService) {
		this.sharedService.userPostings$.subscribe({
			next: (data) => {
				this.userPostings = data;
			},
			error: (err) => console.log(err),
		});
	}

	ngOnInit(): void {}
}
