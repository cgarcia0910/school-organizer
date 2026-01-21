import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenarioTimetableFeature } from './scenario-timetable-feature';

describe('ScenarioTimetableFeature', () => {
  let component: ScenarioTimetableFeature;
  let fixture: ComponentFixture<ScenarioTimetableFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioTimetableFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioTimetableFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
