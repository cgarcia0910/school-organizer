import { Directive, HostListener, inject, Injector, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateTeacherDialog } from '../components/add-update-teacher-dialog/add-update-teacher-dialog';
import { UPDATE_TEACHER } from '../../domain';
import { Teacher } from '@organizer/generated-server-teacher';
import { SubjectDatasource } from '../../application';

@Directive({
  selector: '[libUpdateTeacher]',
})
export class UpdateTeacherDirective {
  @Input({ alias: 'libUpdateTeacher', required: true }) teacher!: Teacher;
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  private dataSource = inject(SubjectDatasource);
  @HostListener('click')
  updateTeacher(): void {
    this.dialog.open(AddUpdateTeacherDialog, {
      width: '600px',
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: UPDATE_TEACHER,
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
