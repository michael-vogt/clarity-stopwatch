import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClarityTask } from './clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { ClarityTaskDto } from './clarity-tasks-list/clarity-tasks-list-item/clarity-task-dto';

@Service()
export class ClarityTasksService {

  private readonly http = inject(HttpClient);
  private readonly items = signal<ClarityTask[]>([]);
  readonly tasks = this.items.asReadonly();

  addTask(item: ClarityTask): void  {
    this.items.set([...this.items(), item]);
    console.log(this.items());
  }

  reload(): void {
    this.http.get<ClarityTaskDto[]>('/clarity-tasks.json').subscribe((dtos) => {
      const tasks = dtos.map(ClarityTask.fromDto);
      this.items.set(tasks);
    });
  }

}
