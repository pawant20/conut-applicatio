import { TestBed } from '@angular/core/testing';

import { LazyRefServiceService } from './lazy-ref-service.service';

describe('LazyRefServiceService', () => {
  let service: LazyRefServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyRefServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
