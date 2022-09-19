import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
	let service: AuthGuardService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideMockStore({})],
		});
		service = TestBed.inject(AuthGuardService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
