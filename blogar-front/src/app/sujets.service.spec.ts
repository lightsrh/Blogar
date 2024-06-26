import { TestBed } from '@angular/core/testing';

import { SujetService } from './sujets.service';

describe('SujetsService', () => {
  let service: SujetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SujetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
