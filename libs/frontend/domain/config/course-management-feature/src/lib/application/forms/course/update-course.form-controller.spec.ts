import { TestBed } from '@angular/core/testing';
import { CourseService } from '@organizer/course-api';
import { CourseFormController } from './course.form-controller';
import { mockProvider } from '@ngneat/spectator/jest';
import { AddCourseFormController } from './add-course.form-controller';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUpdateCourseDialog } from '../../../delivery/components';
import { SubjectService } from '@organizer/subject-api';
import { of, throwError } from 'rxjs';
import { UpdateCourseFormController } from './update-course.form-controller';
import { UPDATE_COURSE } from '../../../domain';

describe('UpdateCourseFormController', () => {
  let controller: UpdateCourseFormController;
  let service: CourseService;
  let dialogRef: MatDialogRef<AddUpdateCourseDialog>;
  let courseService: CourseService;
  let subjectService: SubjectService;
  let coursePostResponse: typeof jest.fn = jest.fn().mockReturnValue(of({ id: 1 }))
  beforeEach(() => {
      TestBed.configureTestingModule({
          providers: [
              UpdateCourseFormController,        
        mockProvider(CourseService, {
          courseIdPut: jest.fn().mockReturnValue(of({ id: 1 }))
        }),
        mockProvider(MatDialogRef<AddUpdateCourseDialog>, {
            close: jest.fn()
        }),
        mockProvider(SubjectService, {
            subjectGet: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Subject 1' }] }))
        }),
        { provide: UPDATE_COURSE, useValue: { id: 1, name: 'Course 1', subjects: [{ subject: { id: 1, name: 'Subject 1' }, workload: { hoursPerWeek: 10, maxDailyWorkload: 10 } }] } },
      ],
    });
    dialogRef = TestBed.inject(MatDialogRef<AddUpdateCourseDialog>);
    courseService = TestBed.inject(CourseService);
    subjectService = TestBed.inject(SubjectService);
    controller = TestBed.inject(UpdateCourseFormController);
  });
    it('should be created', () => {
    expect(controller).toBeTruthy();
    });
    it('should get model with correct structure', () => {
        const model = controller['getModel']();
        expect(model).toEqual({
            name: 'Course 1',
            subjects: [{ subject: 1, hoursPerWeek: 10, maxDailyWorkload: 10 }]
        });
    });
    it('should call courseService.courseIdPut when submit', () => {
        controller.onSubmit();
        expect(courseService.courseIdPut).toHaveBeenCalledWith(1, { 
            name: 'Course 1', 
            subjectWorkLoads: [{ 
              subject: { id: 1 },
              workload: { 
                hoursPerWeek: 10, 
                maxDailyWorkload: 10 
              } 
                }] 
            });
        });
        it('should call dialogRef.close with true when courseIdPut returns a response', () => {
            controller.onSubmit();
            expect(dialogRef.close).toHaveBeenCalledWith(true);
        });
        it('should call dialogRef.close with false when courseIdPut returns an error', () => {
            jest.spyOn(courseService, 'courseIdPut').mockReturnValue(throwError(() => new Error('Error')));
            controller.onSubmit();
            expect(dialogRef.close).toHaveBeenCalledWith(false);
        });
});