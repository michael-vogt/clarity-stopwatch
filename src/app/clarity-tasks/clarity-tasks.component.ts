import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-clarity-tasks',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './clarity-tasks.component.html',
  styleUrl: './clarity-tasks.component.scss',
})
export class ClarityTasksComponent {

}
