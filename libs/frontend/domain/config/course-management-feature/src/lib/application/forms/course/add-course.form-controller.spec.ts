import { TestBed } from '@angular/core/testing';
import { CourseService } from '@organizer/course-api';
import { CourseFormController } from './course.form-controller';
import { mockProvider } from '@ngneat/spectator/jest';
import { AddCourseFormController } from './add-course.form-controller';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUpdateCourseDialog } from '../../../delivery/components';
import { SubjectService } from '@organizer/subject-api';
import { of, throwError } from 'rxjs';

describe('AddCourseFormController', () => {
  let controller: AddCourseFormController;
  let service: CourseService;
  let dialogRef: MatDialogRef<AddUpdateCourseDialog>;
  let courseService: CourseService;
  let subjectService: SubjectService;
  let coursePostResponse: typeof jest.fn = jest.fn().mockReturnValue(of({ id: 1 }))
  beforeEach(() => {
      TestBed.configureTestingModule({
          providers: [
              AddCourseFormController,        
        mockProvider(CourseService, {
          coursePost: jest.fn().mockReturnValue(of({ id: 1 }))
        }),
        mockProvider(MatDialogRef<AddUpdateCourseDialog>, {
            close: jest.fn()
        }),
        mockProvider(SubjectService, {
            subjectGet: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Subject 1' }] }))
        }),
      ],
    });
    dialogRef = TestBed.inject(MatDialogRef<AddUpdateCourseDialog>);
    courseService = TestBed.inject(CourseService);
    subjectService = TestBed.inject(SubjectService);
    controller = TestBed.inject(AddCourseFormController);
  });
    it('should be created', () => {
    expect(controller).toBeTruthy();
    });
    it('should call courseService.coursePost', () => {
    controller.onSubmit();
    expect(courseService.coursePost).toHaveBeenCalled();
    });
    it('should call dialogRef.close with true when coursePost returns a response', () => {
    controller.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
    it('should call dialogRef.close with false when coursePost returns an error', () => {
        jest.spyOn(courseService, 'coursePost').mockReturnValue(
            throwError(() => new Error('Error'))
          );
    controller.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
    });
});