import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { ConfigOptionSelectorComponent } from '../../delivery/components/config-option-selector/config-option-selector.component';

export const remoteRoutes: Route[] = [
    { path: '', component: RemoteEntry, children: [
        { path: 'teacher', loadComponent: () => import('@school-organizer/teacher-management-feature').then((m) => m.TeacherManagementFeature) },
        { path: 'subject', loadComponent: () => import('@school-organizer/subject-management-feature').then((m) => m.SubjectManagementFeature) },
        { path: 'course', loadComponent: () => import('@school-organizer/course-management-feature').then((m) => m.CourseManagementFeature) },
        { path: '**', component: ConfigOptionSelectorComponent },
    ] },
];
