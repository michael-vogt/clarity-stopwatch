import { Component, inject, signal } from '@angular/core';
import { ClarityTasksService } from '../clarity-tasks/clarity-tasks-service';
import { ClarityStopwatchTaskComponent } from './clarity-stopwatch-task/clarity-stopwatch-task.component';
import { ClarityTask } from '../clarity-tasks/clarity-tasks-list/clarity-tasks-list-item/clarity-task';

@Component({
  selector: 'app-clarity-stopwatch',
  imports: [ClarityStopwatchTaskComponent],
  templateUrl: './clarity-stopwatch.component.html',
  styleUrl: './clarity-stopwatch.component.scss',
})
export class ClarityStopwatchComponent {
  private readonly taskService = inject(ClarityTasksService);
  readonly tasks = this.taskService.tasks;

  protected groups(): string[] {
    return this.taskService.groups();
  }

  protected tasksForGroup(group: string): ClarityTask[] {
    return this.taskService.getTasksForGroup(group);
  }

}
