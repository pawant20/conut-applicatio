import { TestBed } from '@angular/core/testing';

import { AlreadyLoggedInGaurdsService } from './already-logged-in-gaurds.service';

describe('AlreadyLoggedInGaurdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlreadyLoggedInGaurdsService = TestBed.get(AlreadyLoggedInGaurdsService);
    expect(service).toBeTruthy();
  });
});
