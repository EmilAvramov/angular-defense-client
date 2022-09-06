import { TestBed } from '@angular/core/testing';

import { DeviceDetailsService } from './deviceDetails.service';

describe('DeviceDetailsService', () => {
  let service: DeviceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
