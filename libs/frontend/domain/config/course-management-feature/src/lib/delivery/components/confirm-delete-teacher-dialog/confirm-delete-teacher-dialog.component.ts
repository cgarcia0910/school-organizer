import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DELETE_COURSE } from '../../../domain';
import { CourseDataSource } from '../../../application';
import { CourseService } from '@organizer/course-api';



@Component({
  selector: 'lib-confirm-delete-teacher-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './confirm-delete-teacher-dialog.component.html',
  styleUrl: './confirm-delete-teacher-dialog.component.scss',
})
export class ConfirmDeleteTeacherDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDeleteTeacherDialogComponent>);
  private courseService = inject(CourseService);
  private dataSource = inject(CourseDataSource);
  private course = inject(DELETE_COURSE);
  deleteTeacher() {
    this.courseService.courseIdDelete(this.course.id).subscribe((result) => {
      this.dataSource.refresh();
      this.dialogRef.close(true);
    })
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
