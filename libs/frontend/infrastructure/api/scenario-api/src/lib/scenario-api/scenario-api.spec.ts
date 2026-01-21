import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenarioApi } from './scenario-api';

describe('ScenarioApi', () => {
  let component: ScenarioApi;
  let fixture: ComponentFixture<ScenarioApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioApi],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
