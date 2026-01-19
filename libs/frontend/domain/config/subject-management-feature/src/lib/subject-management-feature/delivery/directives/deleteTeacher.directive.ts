import { Directive, HostListener, inject, Injector, Input } from '@angular/core';
import { SubjectService } from '@organizer/subject-api';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from '@organizer/generated-server-teacher';
import { ConfirmDeleteTeacherDialogComponent } from '../components/confirm-delete-teacher-dialog/confirm-delete-teacher-dialog.component';
import { DELETE_TEACHER } from '../../domain/tokens/delete-teacher.token';
import { SubjectDataSource } from '../../application';

@Directive({
  selector: '[libDeleteTeacher]',
})
export class DeleteTeacherDirective {
  @Input({ alias: 'libDeleteTeacher', required: true }) teacher!: Teacher;
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  private dataSource = inject(SubjectDataSource);
  private readonly subjectService = inject(SubjectService);
  @HostListener('click')
  deleteTeacher(): void {
    // this.teacherService.teacherIdDelete(this.teacher.id).subscribe((result) => {
    //     this.dataSource.refresh();
    // })
    this.dialog.open(ConfirmDeleteTeacherDialogComponent, {
      width: '600px',
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: DELETE_TEACHER,
            useValue: this.teacher,
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
