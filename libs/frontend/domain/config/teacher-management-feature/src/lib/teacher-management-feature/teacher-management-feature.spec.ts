import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherManagementFeature } from './teacher-management-feature';

describe('TeacherManagementFeature', () => {
  let component: TeacherManagementFeature;
  let fixture: ComponentFixture<TeacherManagementFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherManagementFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherManagementFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
