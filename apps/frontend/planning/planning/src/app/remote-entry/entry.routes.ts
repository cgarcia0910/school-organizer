import { Route } from '@angular/router';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [{ path: '', component: RemoteEntry, children: [
        { path: 'scenario', loadComponent: () => import('@school-organizer/planning/scenario-management-feature').then((m) => m.ScenarioManagementFeature) },
        { path: 'scenario/:scenarioId/course', loadComponent: () => import('@school-organizer/planning/scenario-timetable-feature').then((m) => m.ScenarioTimetableCoursePage)  },
        { path: '**', redirectTo: 'scenario' },
] }];
