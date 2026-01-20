import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CourseDataSource } from '../application/datasources/course.datasource';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@ngneat/transloco';
import { AddCourseDirective, DeleteCourseDirective, UpdateCourseDirective } from '../delivery/directives';
import { SubjectWorkLoad } from '@organizer/course-api';

@Component({
  selector: 'lib-course-management-feature',
  imports: [    
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    AddCourseDirective,
    UpdateCourseDirective,
    DeleteCourseDirective,
    TranslocoPipe,
    JsonPipe,
  ],
  templateUrl: './course-management-feature.html',
  styleUrl: './course-management-feature.scss',
  providers: [CourseDataSource],
})
export class CourseManagementFeature {
  displayedColumns: string[] = ['name', 'habilities', 'actions'];
  dataSource = inject(CourseDataSource);

  getSubjects(subjects: SubjectWorkLoad[]): string {
    return subjects.map((subject: SubjectWorkLoad) => `${subject.subject?.name} (${subject.workload?.hoursPerWeek} hours per week, ${subject.workload?.maxDailyWorkload} max daily workload)`).join(', ');
  }
}
