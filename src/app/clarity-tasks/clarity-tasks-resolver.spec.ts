import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { clarityTasksResolver } from './clarity-tasks-resolver';

describe('clarityTasksResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => clarityTasksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
