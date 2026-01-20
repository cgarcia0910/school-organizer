import { Component, inject } from '@angular/core';
import { SubjectDataSource } from './application';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddTeacherDirective } from './delivery/directives/addTeacher.directive';
import { DeleteTeacherDirective } from './delivery/directives/deleteTeacher.directive';
import { UpdateTeacherDirective } from './delivery/directives/updateTeacher.directive';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'lib-subject-management-feature',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    AddTeacherDirective,
    UpdateTeacherDirective,
    DeleteTeacherDirective,
    TranslocoPipe,
  ],
  templateUrl: './subject-management-feature.html',
  styleUrl: './subject-management-feature.scss',
  providers: [SubjectDataSource]
})
export class SubjectManagementFeature {
  displayedColumns: string[] = ['name', 'habilities', 'actions'];
  dataSource = inject(SubjectDataSource);
}
