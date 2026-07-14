import { Component, inject, output, signal } from '@angular/core';
import { ClarityTask } from '../clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { ClarityTasksService } from '../clarity-tasks-service';

@Component({
  selector: 'app-clarity-tasks-input',
  imports: [],
  templateUrl: './clarity-tasks-input.component.html',
  styleUrl: './clarity-tasks-input.component.scss',
})
export class ClarityTasksInputComponent {

  private readonly taskService = inject(ClarityTasksService);
  readonly internalTask = signal<ClarityTask>({
    id: '',
    bezeichnung: '',
    time_spent: new Map<Date, number>(),
  });

  add(): void {
    this.taskService.addTask(this.internalTask());
  }

  protected updateTask(id: string, bezeichnung: string): void {
    this.internalTask.update((oldTask) => {
      return {
        id: id,
        bezeichnung: bezeichnung,
        time_spent: oldTask.time_spent,
      };
    });
  }
}
