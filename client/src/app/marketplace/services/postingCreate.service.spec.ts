import { TestBed } from '@angular/core/testing';

import { PostingCreateService } from './postingCreate.service';

describe('PostingCreateService', () => {
  let service: PostingCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostingCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
