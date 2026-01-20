import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateTeacherDialog } from './add-update-teacher-dialog';

describe('AddUpdateTeacherDialog', () => {
  let component: AddUpdateTeacherDialog;
  let fixture: ComponentFixture<AddUpdateTeacherDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateTeacherDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateTeacherDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
