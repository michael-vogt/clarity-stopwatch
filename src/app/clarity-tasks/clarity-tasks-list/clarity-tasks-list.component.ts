import { Component, computed, inject, signal } from '@angular/core';
import { ClarityTasksListItemComponent } from './clarity-tasks-list-item/clarity-tasks-list-item.component';
import { ClarityTasksService, dateToKey } from '../clarity-tasks-service';
import { DatePipe } from '@angular/common';
import { toDayKey } from './clarity-tasks-list-item/clarity-task';
import { ElapsedTimePipe } from '../../elapsed-time-pipe';

export type Format = 'decimal' | 'hms' | 'hm';

@Component({
  selector: 'app-clarity-tasks-list',
  imports: [ClarityTasksListItemComponent, DatePipe, ElapsedTimePipe],
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

  readonly date = signal<Date>(this.resetToMonday(new Date()));
  selectedDateInput = computed(() => {
    const date = this.date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  readonly weekDays = computed(() => {
    return [0, 1, 2, 3, 4].map((d) => {
      let date = new Date(this.date().getTime());
      date.setDate(this.date().getDate() + d);
      return date;
    });
  });

  previousWeek(): void {
    this.date.update((d) => {
      const prevWeek = new Date(d);
      prevWeek.setDate(prevWeek.getDate() - 7);
      return prevWeek;
    });
  }

  thisWeek(): void {
    this.date.update(() => this.resetToMonday(new Date()));
  }

  nextWeek(): void {
    this.date.update((d) => {
      const nextWeek = new Date(d);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek;
    });
  }

  selectedFormat = signal<Format>('hms');
  onFormatChange(event: Event): void {
    if (event) {
      const value = (event.target as HTMLSelectElement).value;
      switch (value) {
        case 'decimal':
          this.selectedFormat.set('decimal');
          break;
        case 'hms':
          this.selectedFormat.set('hms');
          break;
        case 'hm':
          this.selectedFormat.set('hm');
      }
    }
  }

  onDateInputChange(value: string): void {
    if (!value) {
      return;
    }

    const [year, month, day] = value.split('-').map(Number);
    const newDate = new Date(year, month - 1, day);
    let dayOfWeek = newDate.getDay();
    if (dayOfWeek === 6) {
      dayOfWeek = 7;
    }
    newDate.setDate(newDate.getDate() - (dayOfWeek - 1));
    this.date.set(newDate);
  }

  private resetToMonday(date: Date): Date {
    const dateCopy = new Date(date);
    let dayOfWeek = dateCopy.getDay();
    if (dayOfWeek === 6) {
      dayOfWeek = 7;
    }
    dateCopy.setDate(dateCopy.getDate() - (dayOfWeek - 1));
    return dateCopy;
  }

  readonly todayIndex = computed(() => {
    const todayKey = dateToKey(new Date());
    return this.weekDays().findIndex(day => dateToKey(day) === todayKey);
  });

  protected readonly effortSum = computed(() => {
    return this.weekDays().map(day => {
      const key = toDayKey(day);
      return this.tasks().reduce((sum, task) => sum + (task.effort.get(key) ?? 0), 0);
    });
  });
}
