import { Component, computed, inject, signal } from '@angular/core';
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

  readonly date = signal<Date>(new Date());
  selectedDateInput = computed(() => {
    const date = this.date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  onDateInputChange(value: string): void {
    if (!value) {
      return;
    }

    const [year, month, day] = value.split('-').map(Number);
    this.date.set(new Date(year, month-1, day));
  }
}
