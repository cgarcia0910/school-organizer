import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ConfirmDeleteCourseDialogComponent } from './confirm-delete-course-dialog.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { mockProvider } from '@ngneat/spectator/jest';
import { CourseService } from '@organizer/course-api';
import { of } from 'rxjs';
import { CourseDataSource } from '../../../application';
import { DELETE_COURSE } from '../../../domain';
import { MatDialogRef } from '@angular/material/dialog';


describe('ConfirmDeleteCourseDialogComponent', () => {
  let component: ConfirmDeleteCourseDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteCourseDialogComponent>;
  let courseService: CourseService;
  let courseDataSource: CourseDataSource;
  let dialogRef: MatDialogRef<ConfirmDeleteCourseDialogComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteCourseDialogComponent, TranslocoTestingModule.forRoot({
        langs: { en: {} },
        translocoConfig: {
          availableLangs: ['en'],
          defaultLang: 'en',
        },
      }),],
      providers: [
        
         mockProvider(CourseService, {
            courseIdDelete: jest.fn().mockReturnValue(of({ id: 1 })),
         }),
        mockProvider(CourseDataSource, {
            refresh: jest.fn(),
          }),
        {
          provide: DELETE_COURSE,
          useValue: { id: 1 },
        },
        mockProvider(MatDialogRef<ConfirmDeleteCourseDialogComponent>, {
          close: jest.fn(),
        }),
      ],
    })
    // .overrideComponent(ConfirmDeleteCourseDialogComponent, {
    //   set: {
        
    //   },
    // })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteCourseDialogComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    courseDataSource = TestBed.inject(CourseDataSource);
    dialogRef = TestBed.inject(MatDialogRef<ConfirmDeleteCourseDialogComponent>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call courseService.courseIdDelete', () => {
    component.deleteCourse();
    expect(courseService.courseIdDelete).toHaveBeenCalledWith(1);
  });
  it('should call courseDataSource.refresh', fakeAsync(() => {
    component.deleteCourse();
    tick();
    expect(courseDataSource.refresh).toHaveBeenCalled();
  }));
  it('should call dialogRef.close with true', fakeAsync(  () => {
    component.deleteCourse();
    tick();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  }));

  it('should call dialogRef.close with false when cancel', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });
});
