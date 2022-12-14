import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
	let service: ModalService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ModalService);
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
