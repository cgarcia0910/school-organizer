import { Directive, HostListener, inject, Injector, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateSubjectDialog } from '../components/add-update-subject-dialog/add-update-subject-dialog';
import { UPDATE_SUBJECT } from '../../domain';
import { SubjectDataSource } from '../../application';
import { Subject } from '@organizer/subject-api';

@Directive({
  selector: '[libUpdateSubject]',
})
export class UpdateSubjectDirective {
  @Input({ alias: 'libUpdateSubject', required: true }) subject!: Subject;
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  private dataSource = inject(SubjectDataSource);
  @HostListener('click')
  updateTeacher(): void {
    this.dialog.open(AddUpdateSubjectDialog, {
      width: '600px',
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: UPDATE_SUBJECT,
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
