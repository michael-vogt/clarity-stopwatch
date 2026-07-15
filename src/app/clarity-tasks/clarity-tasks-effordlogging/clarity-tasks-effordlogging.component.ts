import { Component, computed, inject } from '@angular/core';
import { ClarityTasksService } from '../clarity-tasks-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clarity-tasks-effordlogging',
  imports: [DatePipe],
  templateUrl: './clarity-tasks-effordlogging.component.html',
  styleUrl: './clarity-tasks-effordlogging.component.scss',
})
export class ClarityTasksEffordloggingComponent {
  private readonly taskService = inject(ClarityTasksService);

  protected currentDate = new Date();
  private lastTaskDiv: HTMLDivElement | undefined;


  readonly tasks = this.taskService.tasks;

  startStopwatch(element: HTMLDivElement, id: string): void {
    if (this.lastTaskDiv) {
      this.lastTaskDiv.classList.remove('active');
    }

    element.classList.add('active');
    this.lastTaskDiv = element;

    const task = this.taskService.findTask(id);
    if (task) {
      console.log('Starte Stoppuhr für Aufgabe', task.bezeichnung);
    } else {
      console.log('Kein passender Task gefunden für id', id);
    }
  }
}
