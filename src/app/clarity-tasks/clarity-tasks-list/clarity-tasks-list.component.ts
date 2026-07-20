import { Component, inject } from '@angular/core';
import { ClarityTasksListItemComponent } from './clarity-tasks-list-item/clarity-tasks-list-item.component';
import { ClarityTasksService } from '../clarity-tasks-service';

@Component({
  selector: 'app-clarity-tasks-list',
  imports: [ClarityTasksListItemComponent],
  templateUrl: './clarity-tasks-list.component.html',
  styleUrl: './clarity-tasks-list.component.scss',
})
export class ClarityTasksListComponent {
  protected readonly taskService = inject(ClarityTasksService);
  readonly groups = this.taskService.groups;

  readonly tasks = this.taskService.tasks;

  persist(): void {
    this.taskService.persist().subscribe({
      next: () => console.log('Gespeichert'),
      error: (err) => console.log('Fehler beim Speichern', err),
    });
  }
}
