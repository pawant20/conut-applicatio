import { TestBed } from '@angular/core/testing';

import { DeliveryGaurdService } from './delivery-gaurd.service';

describe('DeliveryGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryGaurdService = TestBed.get(DeliveryGaurdService);
    expect(service).toBeTruthy();
  });
});
