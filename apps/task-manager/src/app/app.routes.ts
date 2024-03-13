import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@task-manager/ng-theme/theme').then(m => m.ThemeComponent),
    children: [
      {
        path: 'tasks',
        loadComponent: () => import('@task-manager/ng-pages/tasks/list/task.page').then(m => m.TaskPage)
      }, {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      }
    ]
  }
];
