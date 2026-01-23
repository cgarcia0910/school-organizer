import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateScenarioDialogComponent } from './add-update-scenario-dialog.component';

describe('AddUpdateScenarioDialogComponent', () => {
  let component: AddUpdateScenarioDialogComponent;
  let fixture: ComponentFixture<AddUpdateScenarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateScenarioDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
