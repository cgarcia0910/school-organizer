import { Component, inject, Injector } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TeacherDataSource } from './teacher.datasource';
import { Teacher } from '@organizer/generated-server-teacher';
import { TeacherService } from '@organizer/teacher-api';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateTeacherDialog } from '../delivery/add-update-teacher-dialog/add-update-teacher-dialog';
import { UPDATE_TEACHER } from '../application';

@Component({
  selector: 'lib-teacher-management-feature',
  imports: [MatTableModule, MatPaginatorModule, AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './teacher-management-feature.html',
  styleUrl: './teacher-management-feature.scss',
})
export class TeacherManagementFeature {
  private teacherService = inject(TeacherService);
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new TeacherDataSource(this.teacherService);
  addTeacher(): void {
    this.dialog.open(AddUpdateTeacherDialog, {
      width: '600px',
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.dataSource.refresh();
      }
    });
  }
  editTeacher(teacher: Teacher): void {
    this.dialog.open(AddUpdateTeacherDialog, {
      width: '600px',
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: UPDATE_TEACHER,
            useValue: teacher,
          },
        ],
      }),
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.dataSource.refresh();
      }
    })
  }
}
