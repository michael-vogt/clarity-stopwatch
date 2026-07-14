import { Component, OnInit, inject } from '@angular/core';
import { ClarityTask } from '../clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { ClarityTasksService } from '../clarity-tasks-service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-clarity-tasks',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './clarity-tasks.component.html',
  styleUrl: './clarity-tasks.component.scss',
})
export class ClarityTasksComponent implements OnInit {
  private readonly taskService = inject(ClarityTasksService);

  ngOnInit() {
    this.taskService.reload();
    const map = new Map<Date, number>([
      [new Date('2026-07-13'), 0],
      [new Date('2026-07-14'), 0],
    ]);
    //console.log(JSON.stringify(Array.from(map, ([date, value]) => [date.toISOString(), value])));
  }

  protected addCard($event: ClarityTask) {}
}
