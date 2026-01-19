import { Route } from '@angular/router';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [
    { path: '', component: RemoteEntry, children: [
        { path: 'teacher', loadComponent: () => import('@school-organizer/teacher-management-feature').then((m) => m.TeacherManagementFeature) },
        { path: 'subject', loadComponent: () => import('@school-organizer/subject-management-feature').then((m) => m.SubjectManagementFeature) }
    ] },
];
