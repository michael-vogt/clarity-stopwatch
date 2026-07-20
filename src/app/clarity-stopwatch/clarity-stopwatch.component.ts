import { Component, inject, signal } from '@angular/core';
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
