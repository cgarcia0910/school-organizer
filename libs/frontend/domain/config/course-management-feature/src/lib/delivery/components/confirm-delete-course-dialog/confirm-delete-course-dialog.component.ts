import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DELETE_COURSE } from '../../../domain';
import { CourseDataSource } from '../../../application';
import { CourseService } from '@organizer/course-api';



@Component({
  selector: 'lib-confirm-delete-course-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './confirm-delete-course-dialog.component.html',
  styleUrl: './confirm-delete-course-dialog.component.scss',
})
export class ConfirmDeleteCourseDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDeleteCourseDialogComponent>);
  private courseService = inject(CourseService);
  private dataSource = inject(CourseDataSource);
  private course = inject(DELETE_COURSE);
  deleteCourse() {
    this.courseService.courseIdDelete(this.course.id).subscribe((result) => {
      this.dataSource.refresh();
      this.dialogRef.close(true);
    })
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
