import { Component, computed, inject, signal } from '@angular/core';
import { ClarityTasksService } from '../clarity-tasks/clarity-tasks-service';
import { ClarityStopwatchTaskComponent } from './clarity-stopwatch-task/clarity-stopwatch-task.component';

@Component({
  selector: 'app-clarity-stopwatch',
  imports: [ClarityStopwatchTaskComponent],
  templateUrl: './clarity-stopwatch.component.html',
  styleUrl: './clarity-stopwatch.component.scss',
})
export class ClarityStopwatchComponent {
  protected readonly taskService = inject(ClarityTasksService);
  readonly groups = this.taskService.groups;
  readonly tasks = this.taskService.tasks;

  selectedDate = signal<Date>(new Date());
  selectedDateInput = computed(() => {
    const date = this.selectedDate();
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
    this.selectedDate.set(new Date(year, month-1, day));
  }

  protected readonly isToday = computed(() => {
    const date = this.selectedDate();
    const today = new Date();
    return date.getFullYear() === today.getFullYear()
      && date.getMonth() === today.getMonth()
      && date.getDate() === today.getDate();
  });

  resetToToday(): void {
    this.selectedDate.set(new Date());
  }

  selectedTaskId = signal<string | null>(null);
  clearSelection() {
    this.selectedTaskId.set(null);
  }

  expandedGroups = signal<Set<string>>(new Set());

  toggleGroup(group: string): void {
    this.expandedGroups.update(groups => {
      const newGroups = new Set(groups);
      if (newGroups.has(group)) {
        newGroups.delete(group);
      } else {
        newGroups.add(group);
      }

      return newGroups;
    });
  }

  isExpanded(group: string): boolean {
    return this.expandedGroups().has(group);
  }

}
