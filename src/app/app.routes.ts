import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClarityTasksListComponent } from './clarity-tasks-list/clarity-tasks-list.component';
import { ClarityTasksInputComponent } from './clarity-tasks-input/clarity-tasks-input.component';
import { ClarityTasksComponent } from './clarity-tasks/clarity-tasks.component';

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
      }
    ]
  },
];
