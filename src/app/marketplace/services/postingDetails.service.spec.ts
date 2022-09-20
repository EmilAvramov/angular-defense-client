import { TestBed } from '@angular/core/testing';

import { PostingDetailsService } from './postingDetails.service';

describe('PostingDetailsService', () => {
	let service: PostingDetailsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PostingDetailsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
	it('should init display with false', () => {
		let state: boolean = false;
		service.watch().subscribe((value: boolean) => (state = value));
		expect(state).toBeFalsy();
	});
	it('should advanced observable to true on open', () => {
		let state: boolean = false;
		service.open();
		service.watch().subscribe((value: boolean) => (state = value));
		expect(state).toBeTruthy();
	});
	it('should open and close observable in succession', () => {
		let state: boolean = false;
		service.open();
		service.close();
		service.watch().subscribe((value: boolean) => (state = value));
		expect(state).toBeFalsy();
	});
});
