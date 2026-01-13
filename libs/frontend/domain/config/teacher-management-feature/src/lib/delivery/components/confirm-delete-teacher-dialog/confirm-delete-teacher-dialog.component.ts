import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DELETE_TEACHER } from '../../../domain';
import { TeacherService } from '@organizer/teacher-api';
import { TeacherDataSource } from '../../../teacher-management-feature/teacher.datasource';


@Component({
  selector: 'lib-confirm-delete-teacher-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './confirm-delete-teacher-dialog.component.html',
  styleUrl: './confirm-delete-teacher-dialog.component.scss',
})
export class ConfirmDeleteTeacherDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDeleteTeacherDialogComponent>);
  private teacherService = inject(TeacherService);
  private dataSource = inject(TeacherDataSource);
  private teacher = inject(DELETE_TEACHER);
  deleteTeacher() {
    this.teacherService.teacherIdDelete(this.teacher.id).subscribe((result) => {
      this.dataSource.refresh();
      this.dialogRef.close(true);
    })
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
