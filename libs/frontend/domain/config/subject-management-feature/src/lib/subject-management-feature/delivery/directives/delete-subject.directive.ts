import { Directive, HostListener, inject, Injector, Input } from '@angular/core';
import { Subject, SubjectService } from '@organizer/subject-api';
import { MatDialog } from '@angular/material/dialog';

import { DELETE_SUBJECT } from '../../domain/tokens/delete-teacher.token';
import { SubjectDataSource } from '../../application';
import { ConfirmDeleteSubjectDialogComponent } from '../components/confirm-delete-subject-dialog/confirm-delete-subject-dialog.component';

@Directive({
  selector: '[libDeleteSubject]',
})
export class DeleteSubjectDirective {
  @Input({ alias: 'libDeleteSubject', required: true }) subject!: Subject;
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  private dataSource = inject(SubjectDataSource);
  private readonly subjectService = inject(SubjectService);
  @HostListener('click')
  deleteTeacher(): void {
    // this.teacherService.teacherIdDelete(this.teacher.id).subscribe((result) => {
    //     this.dataSource.refresh();
    // })
    this.dialog.open(ConfirmDeleteSubjectDialogComponent, {
      width: '600px',
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: DELETE_SUBJECT,
            useValue: this.subject,
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
