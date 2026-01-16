import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectApi } from './subject-api';

describe('SubjectApi', () => {
  let component: SubjectApi;
  let fixture: ComponentFixture<SubjectApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectApi],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
