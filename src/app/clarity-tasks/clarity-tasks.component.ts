import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ClarityTasksService } from './clarity-tasks-service';

@Component({
  selector: 'app-clarity-tasks',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './clarity-tasks.component.html',
  styleUrl: './clarity-tasks.component.scss',
})
export class ClarityTasksComponent {
  private taskService = inject(ClarityTasksService);
  persist(): void {
    this.taskService.persist().subscribe({
      next: () => console.log('Gespeichert'),
      error: (err) => console.log('Fehler beim Speichern', err),
    });
  }
}
