import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TeacherDataSource } from './teacher.datasource';
import { TeacherService } from '@organizer/teacher-api';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'lib-teacher-management-feature',
  imports: [MatTableModule, MatPaginatorModule, AsyncPipe, NgIf, JsonPipe, MatIconModule, MatButtonModule],
  templateUrl: './teacher-management-feature.html',
  styleUrl: './teacher-management-feature.scss',
})
export class TeacherManagementFeature {
  private teacherService = inject(TeacherService);
  displayedColumns: string[] = ['name'];
  dataSource = new TeacherDataSource(this.teacherService);
}
