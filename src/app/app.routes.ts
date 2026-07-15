import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClarityTasksListComponent } from './clarity-tasks/clarity-tasks-list/clarity-tasks-list.component';
import { ClarityTasksInputComponent } from './clarity-tasks/clarity-tasks-input/clarity-tasks-input.component';
import { ClarityTasksComponent } from './clarity-tasks/clarity-tasks.component';
import { ClarityTasksEffordloggingComponent } from './clarity-tasks/clarity-tasks-effordlogging/clarity-tasks-effordlogging.component';
import { ClarityStopwatchComponent } from './clarity-stopwatch/clarity-stopwatch.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: ClarityTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ClarityTasksListComponent
      },
      {
        path: 'input',
        component: ClarityTasksInputComponent
      },
      {
        path: 'effordlogging',
        component: ClarityTasksEffordloggingComponent
      }
    ]
  },
  {
    path: 'stopwatch',
    component: ClarityStopwatchComponent
  }
];
