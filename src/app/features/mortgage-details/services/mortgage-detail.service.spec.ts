import { TestBed } from '@angular/core/testing';

import { MortgageDetailService } from './mortgage-detail.service';

describe('MortgageDetailService', () => {
  let service: MortgageDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
