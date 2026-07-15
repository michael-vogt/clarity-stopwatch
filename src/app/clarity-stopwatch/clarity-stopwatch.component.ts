import { Component, inject } from '@angular/core';
import { ClarityTasksService } from '../clarity-tasks/clarity-tasks-service';
import { ClarityStopwatchTaskComponent } from './clarity-stopwatch-task/clarity-stopwatch-task.component';

@Component({
  selector: 'app-clarity-stopwatch',
  imports: [ClarityStopwatchTaskComponent],
  templateUrl: './clarity-stopwatch.component.html',
  styleUrl: './clarity-stopwatch.component.scss',
})
export class ClarityStopwatchComponent {
  private readonly taskService = inject(ClarityTasksService);
  readonly tasks = this.taskService.tasks;
}
