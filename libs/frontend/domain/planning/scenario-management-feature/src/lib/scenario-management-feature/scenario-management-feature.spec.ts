import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenarioManagementFeature } from './scenario-management-feature';

describe('ScenarioManagementFeature', () => {
  let component: ScenarioManagementFeature;
  let fixture: ComponentFixture<ScenarioManagementFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioManagementFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioManagementFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
