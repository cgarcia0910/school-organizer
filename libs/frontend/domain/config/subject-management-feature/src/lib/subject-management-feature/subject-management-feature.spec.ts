import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectManagementFeature } from './subject-management-feature';

describe('SubjectManagementFeature', () => {
  let component: SubjectManagementFeature;
  let fixture: ComponentFixture<SubjectManagementFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectManagementFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectManagementFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
