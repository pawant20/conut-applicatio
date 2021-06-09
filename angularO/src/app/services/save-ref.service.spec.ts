import { TestBed } from '@angular/core/testing';

import { SaveRefService } from './save-ref.service';

describe('SaveRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveRefService = TestBed.get(SaveRefService);
    expect(service).toBeTruthy();
  });
});
