import { Directive, HostListener, inject } from '@angular/core';
import { AddUpdateTeacherDialog } from '../components/add-update-teacher-dialog/add-update-teacher-dialog';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDataSource } from '../../application';

@Directive({
  selector: '[libAddTeacher]',
})
export class AddTeacherDirective {
  private dialog = inject(MatDialog);
  private dataSource = inject(SubjectDataSource);
  @HostListener('click')
  addTeacher(): void {
    this.dialog.open(AddUpdateTeacherDialog, {
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
