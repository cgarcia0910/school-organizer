import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteTeacherDialogComponent } from './confirm-delete-teacher-dialog.component';

describe('ConfirmDeleteTeacherDialogComponent', () => {
  let component: ConfirmDeleteTeacherDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteTeacherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteTeacherDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
