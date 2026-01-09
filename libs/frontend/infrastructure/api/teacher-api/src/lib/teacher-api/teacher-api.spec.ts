import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherApi } from './teacher-api';

describe('TeacherApi', () => {
  let component: TeacherApi;
  let fixture: ComponentFixture<TeacherApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherApi],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
