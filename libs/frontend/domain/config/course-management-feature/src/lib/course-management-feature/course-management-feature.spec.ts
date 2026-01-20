import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseManagementFeature } from './course-management-feature';

describe('CourseManagementFeature', () => {
  let component: CourseManagementFeature;
  let fixture: ComponentFixture<CourseManagementFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseManagementFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseManagementFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
