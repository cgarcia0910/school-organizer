import { Component, inject, InjectionToken, Injector } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TeacherDataSource } from './teacher.datasource';
import { TeacherService } from '@organizer/teacher-api';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateTeacherDialog } from '../delivery/add-update-teacher-dialog/add-update-teacher-dialog';

export const TOKEN = new InjectionToken<number>('token');

@Component({
  selector: 'lib-teacher-management-feature',
  imports: [MatTableModule, MatPaginatorModule, AsyncPipe, NgIf, JsonPipe, MatIconModule, MatButtonModule],
  templateUrl: './teacher-management-feature.html',
  styleUrl: './teacher-management-feature.scss',
})
export class TeacherManagementFeature {
  private teacherService = inject(TeacherService);
  private dialog = inject(MatDialog);
  displayedColumns: string[] = ['name'];
  dataSource = new TeacherDataSource(this.teacherService);
  addTeacher(): void {
    this.dialog.open(AddUpdateTeacherDialog, {
      width: '600px',
      injector: Injector.create({
        providers: [
          {
            provide: TOKEN,
            useValue: 1,
          },
        ],
      }),
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.dataSource.refresh();
      }
    });
  }
}
