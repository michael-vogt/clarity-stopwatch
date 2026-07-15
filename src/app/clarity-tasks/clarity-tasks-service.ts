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

  /**
   * Tries to find a unique ClarityTask for the given id.
   * @param id
   * @returns depending on the number of ClarityTask objects matching the criterion:
   *
   * * the object, if a unique one was found
   *
   * * <code>undefined</code> if no or more than one matching object was found
   */
  findTask(id: string): ClarityTask | undefined {
    const result = this.tasks().filter(task => task.id === id);
    if (result.length === 1) {
      return result[0];
    }
    return undefined;
  }

  reload(): void {
    this.http.get<ClarityTaskDto[]>('/clarity-tasks.json').subscribe((dtos) => {
      const tasks = dtos.map(ClarityTask.fromDto);
      this.items.set(tasks);
    });
  }

}
