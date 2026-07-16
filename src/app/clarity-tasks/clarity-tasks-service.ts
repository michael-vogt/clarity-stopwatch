import { inject, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClarityTask } from './clarity-tasks-list/clarity-tasks-list-item/clarity-task';
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

    const key = [...task.efford.keys()].find(d => d.getTime() === date.getTime());
    if (key) {
      task.efford.set(key, (task.efford.get(key) ?? 0) + elapsedTime);
    } else {
      task.efford.set(date, elapsedTime);
    }

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
      const tasks = dtos.map(ClarityTask.fromDto);
      this.items.set(tasks);
      this.loaded = true;
    });
  }

  persist(): Observable<void> {
    const dtos: ClarityTaskDto[] = this.items().map(task => task.toDto());
    //console.log(dtos);
    return this.http.put<void>('/clarity-tasks.json', dtos);
  }

}
