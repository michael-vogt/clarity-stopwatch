import { Component, computed, input } from '@angular/core';
import { ClarityTask } from './clarity-task';
import { dateToKey } from '../../clarity-tasks-service';

@Component({
  selector: 'app-clarity-tasks-list-item',
  imports: [],
  templateUrl: './clarity-tasks-list-item.component.html',
  styleUrl: './clarity-tasks-list-item.component.scss',
})
export class ClarityTasksListItemComponent {
  readonly task = input.required<ClarityTask>();
  readonly date = input.required<Date>();

  readonly daysOfWeek = computed<string[]>(() => {
    const dayOfWeek = this.date().getDay();
    const offset = dayOfWeek === 0 ? 7 : dayOfWeek;
    let daysOfWeek: Date[] = [];
    [0, 1, 2, 3, 4].forEach((d) => {
      let date = new Date(this.date().getTime());
      date.setDate(this.date().getDate() + d - offset + 1);
      daysOfWeek.push(date);
    });

    return daysOfWeek.map((d) => dateToKey(d));
  });
}
