import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'planning',
    loadChildren: () => import('planning/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'config',
    loadChildren: () => import('config/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    redirectTo: 'planning',
    pathMatch: 'full',
  },
];
