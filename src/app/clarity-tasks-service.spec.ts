import { TestBed } from '@angular/core/testing';

import { ClarityTasksService } from './clarity-tasks-service';

describe('ClarityTasksService', () => {
  let service: ClarityTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClarityTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
