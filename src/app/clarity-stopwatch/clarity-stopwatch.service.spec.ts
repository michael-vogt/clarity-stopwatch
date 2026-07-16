import { TestBed } from '@angular/core/testing';

import { ClarityStopwatchService } from './clarity-stopwatch.service';

describe('ClarityStopwatchService', () => {
  let service: ClarityStopwatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClarityStopwatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
