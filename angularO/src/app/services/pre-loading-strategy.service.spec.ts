import { TestBed } from '@angular/core/testing';

import { PreLoadingStrategyService } from './pre-loading-strategy.service';

describe('PreLoadingStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreLoadingStrategyService = TestBed.get(PreLoadingStrategyService);
    expect(service).toBeTruthy();
  });
});
