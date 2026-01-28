import { Directive, HostListener, inject, Injector, Input } from '@angular/core';
import { Course } from '@organizer/course-api';
import { MatDialog } from '@angular/material/dialog';

import { CourseDataSource } from '../../application';
import { DELETE_COURSE } from '../../domain';
import { ConfirmDeleteCourseDialogComponent } from '../components';

@Directive({
  selector: '[libDeleteCourse]',
})
export class DeleteCourseDirective {
  @Input({ alias: 'libDeleteCourse', required: true }) course!: Course;
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  private dataSource = inject(CourseDataSource);
  @HostListener('click')
  deleteCourse(): void {
    this.dialog.open(ConfirmDeleteCourseDialogComponent, {
      width: '600px',
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: DELETE_COURSE,
            useValue: this.course,
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
