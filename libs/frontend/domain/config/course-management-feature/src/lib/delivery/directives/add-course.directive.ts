import { Directive, HostListener, inject } from '@angular/core';
import { AddUpdateCourseDialog } from '../components';
import { MatDialog } from '@angular/material/dialog';
import { CourseDataSource } from '../../application';

@Directive({
  selector: '[libAddCourse]',
})
export class AddCourseDirective {
  private dialog = inject(MatDialog);
  private dataSource = inject(CourseDataSource);
  @HostListener('click')
  addCourse(): void {
    this.dialog.open(AddUpdateCourseDialog, {
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
