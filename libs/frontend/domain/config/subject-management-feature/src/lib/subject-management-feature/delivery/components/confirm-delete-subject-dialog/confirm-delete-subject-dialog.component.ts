import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DELETE_SUBJECT } from '../../../domain';
import { SubjectDataSource } from '../../../application';
import { SubjectService } from '@organizer/subject-api';
import { TranslocoPipe } from '@ngneat/transloco';


@Component({
  selector: 'lib-confirm-delete-subject-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogContent, TranslocoPipe],
  templateUrl: './confirm-delete-subject-dialog.component.html',
  styleUrl: './confirm-delete-subject-dialog.component.scss',
})
export class ConfirmDeleteSubjectDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDeleteSubjectDialogComponent>);
  private subjectService = inject(SubjectService);
  private dataSource = inject(SubjectDataSource);
  private subject = inject(DELETE_SUBJECT);
  deleteSubject() {
    this.subjectService.subjectIdDelete(this.subject.id).subscribe((result) => {
      this.dataSource.refresh();
      this.dialogRef.close(true);
    })
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
