import { computed, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClarityTask } from './clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { ClarityTaskDto } from './clarity-tasks-list/clarity-tasks-list-item/clarity-task-dto';
import { Observable } from 'rxjs';

export function dateToKey(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(v => String(v).padStart(2, '0')).join('-');
}

@Service()
export class ClarityTasksService {

  private readonly http = inject(HttpClient);
  private readonly items = signal<ClarityTask[]>([]);
  readonly tasks = this.items.asReadonly();
  private loaded = false;

  addTask(item: ClarityTask): void  {
    this.items.set([...this.items(), item]);
  }

  addElapsedTime(taskId: string, elapsedTime: number, date: Date): void  {
    const task = this.findTask(taskId);
    if (!task) {
      return;
    }

    const updatedTask = task.withAddedEffort(date, elapsedTime);
    this.items.update(tasks => tasks.map(t => t.id === taskId ? updatedTask : t));
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

  idExists(id: string): boolean {
    return (!!this.findTask(id));
  }

  private readonly tasksByGroup = computed(() => {
    const map = new Map<string, ClarityTask[]>();

    for (const task of this.tasks()) {
      const list = map.get(task.gruppe);
      if (list) {
        list.push(task);
      } else {
        map.set(task.gruppe, [task]);
      }
    }

    return map;
  });

  readonly groups = computed<string[]>(() => [...this.tasksByGroup().keys()]);

  getTasksForGroup(group: string): ClarityTask[] {
    return this.tasksByGroup().get(group) ?? [];
  }

  reload(force = false): void {
    if (this.loaded && !force) {
      return;
    }

    this.http.get<ClarityTaskDto[]>('/clarity-tasks.json').subscribe((dtos) => {
      const tasks = dtos.map(ClarityTask.fromDto).sort((a, b) => {
        if (a.gruppe !== b.gruppe) {
          return a.gruppe.localeCompare(b.gruppe);
        }
        return a.bezeichnung.localeCompare(a.bezeichnung);
      });
      this.items.set(tasks);
      this.loaded = true;
    });
  }

  persist(): Observable<void> {
    const dtos: ClarityTaskDto[] = this.items().map(task => task.toDto());
    return this.http.put<void>('/clarity-tasks.json', dtos);
  }

}
