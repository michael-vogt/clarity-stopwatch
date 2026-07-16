import { ResolveFn } from '@angular/router';
import { ClarityTasksService } from './clarity-tasks-service';
import { inject } from '@angular/core';

export const clarityTasksResolver: ResolveFn<void> = () => {
  const service = inject(ClarityTasksService);
  service.reload();
};
