import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CreateTeacherDto, TeacherService } from '@organizer/teacher-api';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-add-update-teacher-dialog',
  imports: [ReactiveFormsModule, FormsModule, NgIf,   MatDialogTitle,
    MatDialogContent, MatInput, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-update-teacher-dialog.html',
  styleUrl: './add-update-teacher-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUpdateTeacherDialog {
  private teacherService = inject(TeacherService);
  private dialogRef = inject(MatDialogRef<AddUpdateTeacherDialog>);
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  userFormFields = [
    {
      label: 'Nombre',
      key: 'name',
      type: 'text',
      required: true,
    },
  ];
  onSubmit(): void {
    this.teacherService.teacherPost(this.userForm.value as CreateTeacherDto).subscribe((response) => {
      this.dialogRef.close(true);
    }, (error) => {
      this.dialogRef.close(false);
    });
  }
}
