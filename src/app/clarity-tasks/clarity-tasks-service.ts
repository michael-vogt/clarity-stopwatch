import { inject, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClarityTask, toDayKey } from './clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { ClarityTaskDto } from './clarity-tasks-list/clarity-tasks-list-item/clarity-task-dto';
import { Observable } from 'rxjs';

@Service()
export class ClarityTasksService {

  private readonly http = inject(HttpClient);
  private readonly items = signal<ClarityTask[]>([]);
  readonly tasks = this.items.asReadonly();
  public selectedTask = signal<ClarityTask>(ClarityTask.empty());

  private loaded = false;

  addTask(item: ClarityTask): void  {
    this.items.set([...this.items(), item]);
  }

  addElapsedTime(taskId: string, elapsedTime: number, date: Date): void  {
    const task = this.findTask(taskId);
    if (!task) {
      return;
    }

    const key = toDayKey(date)
    task.effort.set(key, (task.effort.get(key) ?? 0) + elapsedTime);

    this.items.update(tasks => [...tasks]);
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

  getTasksForGroup(group: string): ClarityTask[] {
    return this.tasks().filter(task => task.gruppe === group);
  }

  groups(): string[] {
    const groups = new Set<string>();

    this.tasks().forEach((task) => {
      if (!groups.has(task.gruppe)) {
        groups.add(task.gruppe);
      }
    });

    return [...groups];
  }

  selectTask(task: ClarityTask): ClarityTask {
    const oldSelectedTask = this.selectedTask();
    if (task.id === oldSelectedTask.id) {
      return oldSelectedTask;
    }

    if (this.tasks().find(t => t.id === task.id)) {
      this.selectedTask.set(task);
    }

    return oldSelectedTask;
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
