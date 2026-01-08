import { Route } from '@angular/router';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [
    { path: '', component: RemoteEntry, children: [
        { path: 'teacher', loadComponent: () => import('@school-organizer/teacher-management-feature').then((m) => m.TeacherManagementFeature) }
    ] },
];
