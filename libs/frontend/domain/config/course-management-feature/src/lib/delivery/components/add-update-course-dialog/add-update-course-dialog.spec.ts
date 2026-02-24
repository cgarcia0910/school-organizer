import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateCourseDialog } from './add-update-course-dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { mockProvider } from '@ngneat/spectator/jest';
import { FormController } from '@organizer/devkit/forms';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CourseService } from '@organizer/course-api';
import { SubjectService } from '@organizer/subject-api';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';



describe('AddUpdateCourseDialog', () => {
  let component: AddUpdateCourseDialog;
  let fixture: ComponentFixture<AddUpdateCourseDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddUpdateCourseDialog,
        TranslocoTestingModule.forRoot({
          langs: { en: {} },
          translocoConfig: {
            availableLangs: ['en'],
            defaultLang: 'en',
          },
        }),
      ],
    })
    .overrideComponent(AddUpdateCourseDialog, {
      set: {
        providers: [
          {
            provide: FormController,
            useValue:  {
              form: new FormGroup({
                name: new FormControl(''),
                subjects: new FormControl([]),
              }),
              getFields: jest.fn().mockReturnValue([]),
              onSubmit: jest.fn(),
            },
          },
        ],
      },
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateCourseDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have formController injected', () => {
    expect(component['formController']).toBeDefined();
  });
  
});
