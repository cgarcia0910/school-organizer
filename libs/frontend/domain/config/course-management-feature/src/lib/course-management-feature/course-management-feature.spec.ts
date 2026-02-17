import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseManagementFeature } from './course-management-feature';
import { mockProvider } from '@ngneat/spectator/jest';
import { CourseDataSource } from '../application';
import { of } from 'rxjs';
import { provideTransloco } from '@ngneat/transloco';
import { Course } from '@organizer/course-api';

describe('CourseManagementFeature', () => {
  let component: CourseManagementFeature;
  let fixture: ComponentFixture<CourseManagementFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseManagementFeature],
      providers: [
        mockProvider(CourseDataSource, {
          page$: of<Course[]>([]),
          total$: of(0),
          fetch: jest.fn(),
          refresh: jest.fn(),
          connect: jest.fn().mockReturnValue(of<Course[]>([])),
          disconnect: jest.fn(),
        }),
        provideTransloco({
          config: { 
            availableLangs: ['en'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
            prodMode: true,
          }
        }),
      ],
    })
    .overrideComponent(CourseManagementFeature, {
      remove: { providers: [CourseDataSource] },
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseManagementFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
