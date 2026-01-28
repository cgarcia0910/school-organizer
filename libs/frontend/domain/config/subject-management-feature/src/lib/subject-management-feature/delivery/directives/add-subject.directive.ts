import { Directive, HostListener, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDataSource } from '../../application';
import { AddUpdateSubjectDialog } from '../components/add-update-subject-dialog/add-update-subject-dialog';

@Directive({
  selector: '[libAddSubject]',
})
export class AddSubjectDirective {
  private dialog = inject(MatDialog);
  private dataSource = inject(SubjectDataSource);
  @HostListener('click')
  addSubject(): void {
    this.dialog.open(AddUpdateSubjectDialog, {
      width: '600px',
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.dataSource.refresh();
      }
    });
  }
}
