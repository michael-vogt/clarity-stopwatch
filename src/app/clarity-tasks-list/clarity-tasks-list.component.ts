import { Component, inject } from '@angular/core';
import { ClarityTask } from './clarity-tasks-list-item/clarity-task';
import { ClarityTasksListItemComponent } from './clarity-tasks-list-item/clarity-tasks-list-item.component';
import { ClarityTasksService } from '../clarity-tasks-service';

@Component({
  selector: 'app-clarity-tasks-list',
  imports: [ClarityTasksListItemComponent],
  templateUrl: './clarity-tasks-list.component.html',
  styleUrl: './clarity-tasks-list.component.scss',
})
export class ClarityTasksListComponent {
  private readonly taskService = inject(ClarityTasksService);

  readonly tasks = this.taskService.tasks;
}
