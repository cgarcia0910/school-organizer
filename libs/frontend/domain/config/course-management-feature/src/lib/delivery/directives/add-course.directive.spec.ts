import { TestBed } from '@angular/core/testing';
import { AddCourseDirective } from './add-course.directive';
import { CourseDataSource } from '../../application';
import { MatDialog } from '@angular/material/dialog';
import { mockProvider } from '@ngneat/spectator/jest';
import { AddUpdateCourseDialog } from '../components';
import { of } from 'rxjs';

describe('AddCourseDirective', () => {
  let directive: AddCourseDirective;
  let dialog: MatDialog;
  let dataSource: CourseDataSource;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddCourseDirective,
        mockProvider(MatDialog, {
          open: jest.fn().mockReturnValue(({
            afterClosed: jest.fn().mockReturnValue(of(true)),
          })),
        }),
        mockProvider(CourseDataSource),
      ],
    });
    directive = TestBed.inject(AddCourseDirective);
    dialog = TestBed.inject(MatDialog);
    dataSource = TestBed.inject(CourseDataSource);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  it('should call dialog.open with AddUpdateCourseDialog', () => {
    directive.addCourse();
    expect(dialog.open).toHaveBeenCalledWith(AddUpdateCourseDialog, {
      width: '600px',
    });
  });
  it('should call dataSource.refresh when afterClosed is true', () => {
    directive.addCourse();
    expect(dataSource.refresh).toHaveBeenCalled();
  });
});
