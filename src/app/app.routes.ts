import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClarityTasksListComponent } from './clarity-tasks/clarity-tasks-list/clarity-tasks-list.component';
import { ClarityTasksComponent } from './clarity-tasks/clarity-tasks.component';
import { ClarityStopwatchComponent } from './clarity-stopwatch/clarity-stopwatch.component';
import { clarityTasksResolver } from './clarity-tasks/clarity-tasks-resolver';
import {
  ClarityTasksInputComponent
} from './clarity-tasks/clarity-tasks-input/clarity-tasks-input.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: ClarityTasksComponent,
    resolve: { tasks: clarityTasksResolver },
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
      }
    ]
  },
  {
    path: 'stopwatch',
    component: ClarityStopwatchComponent
  }
];
