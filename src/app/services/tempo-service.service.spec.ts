import { TestBed } from '@angular/core/testing';

import { TempoServiceService } from './tempo-service.service';

describe('TempoServiceService', () => {
  let service: TempoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
