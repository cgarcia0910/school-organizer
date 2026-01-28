import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenarioTimetableCoursePage } from './scenario-timetable-course-page';

describe('ScenarioTimetableCoursePage', () => {
  let component: ScenarioTimetableCoursePage;
  let fixture: ComponentFixture<ScenarioTimetableCoursePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioTimetableCoursePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioTimetableCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
