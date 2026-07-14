import { Component, input } from '@angular/core';
import { ClarityTask } from './clarity-task';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-clarity-tasks-list-item',
  imports: [ DatePipe ],
  templateUrl: './clarity-tasks-list-item.component.html',
  styleUrl: './clarity-tasks-list-item.component.scss',
})
export class ClarityTasksListItemComponent {

  readonly task = input.required<ClarityTask>(); // : ClarityTask = { id: '', bezeichnung: '', time_spent: new Map<Date, number> };

}
