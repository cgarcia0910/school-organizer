import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AddCourseDirective } from './add-course.directive';
import { CourseDataSource } from '../../application';
import { MatDialog } from '@angular/material/dialog';
import { mockProvider } from '@ngneat/spectator/jest';
import { AddUpdateCourseDialog, ConfirmDeleteCourseDialogComponent } from '../components';
import { of } from 'rxjs';
import { DeleteCourseDirective } from './delete-course.directive';

describe('DeleteCourseDirective', () => {
  let directive: DeleteCourseDirective;
  let dialog: MatDialog;
  let dataSource: CourseDataSource;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteCourseDirective,
        mockProvider(MatDialog, {
          open: jest.fn().mockReturnValue(({
            afterClosed: jest.fn().mockReturnValue(of(true)),
          })),
        }),
        mockProvider(CourseDataSource),
      ],
    });
    directive = TestBed.inject(DeleteCourseDirective);
    dialog = TestBed.inject(MatDialog);
    dataSource = TestBed.inject(CourseDataSource);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  it('should call dialog.open with AddUpdateCourseDialog', () => {
    directive.deleteCourse();
    expect(dialog.open).toHaveBeenCalled()
  });
  it('should call dataSource.refresh when afterClosed is true', fakeAsync(() => {
    directive.deleteCourse();
    tick();
    expect(dataSource.refresh).toHaveBeenCalled();
  }));
});
