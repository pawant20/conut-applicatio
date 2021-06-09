import { TestBed } from '@angular/core/testing';

import { LazyTwoService } from './lazy-two.service';

describe('LazyTwoService', () => {
  let service: LazyTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
