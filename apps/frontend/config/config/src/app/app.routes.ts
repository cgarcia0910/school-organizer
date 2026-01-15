import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  // {
  //   path: 'teacher',
  //   loadChildren: () =>
  //     import('@school-organizer/teacher-management-feature').then((m) => m.TeacherManagementFeature)
  // },
];
