import { Directive, HostListener, inject, Injector, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateCourseDialog } from '../components';
import { UPDATE_COURSE } from '../../domain';
import { Course } from '@organizer/course-api';
import { CourseDataSource } from '../../application';

@Directive({
  selector: '[libUpdateCourse]',
})
export class UpdateCourseDirective {
  @Input({ alias: 'libUpdateCourse', required: true }) course!: Course;
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  private dataSource = inject(CourseDataSource);
  @HostListener('click')
  updateCourse(): void {
    this.dialog.open(AddUpdateCourseDialog, {
      width: '600px',
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: UPDATE_COURSE,
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
