import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TeacherDataSource } from './teacher.datasource';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddTeacherDirective } from '../delivery/directives/addTeacher.directive';
import { UpdateTeacherDirective } from '../delivery/directives/updateTeacher.directive';
import { DeleteTeacherDirective } from '../delivery/directives/deleteTeacher.directive';

@Component({
  selector: 'lib-teacher-management-feature',
  imports: [MatTableModule, MatPaginatorModule, AsyncPipe, MatIconModule, MatButtonModule, AddTeacherDirective, UpdateTeacherDirective, DeleteTeacherDirective], 
  templateUrl: './teacher-management-feature.html',
  styleUrl: './teacher-management-feature.scss',
  providers: [TeacherDataSource],
})
export class TeacherManagementFeature {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = inject(TeacherDataSource);
}
