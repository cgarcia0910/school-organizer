import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent, FormController } from '@organizer/devkit/forms';
import { AddTeacherFormController, UPDATE_TEACHER, UpdateTeacherFormController } from '../../application';

function provideFormController(): FormController {
  console.log('provideFormController', inject(UPDATE_TEACHER, { optional: true }));
  return inject(UPDATE_TEACHER, { optional: true })
    ? inject(UpdateTeacherFormController)
    : inject(AddTeacherFormController)
}

@Component({
  selector: 'lib-add-update-teacher-dialog',
  imports: [ReactiveFormsModule, FormsModule,   MatDialogTitle,
    MatDialogContent, MatFormFieldModule, MatButtonModule, FormComponent],
  templateUrl: './add-update-teacher-dialog.html',
  styleUrl: './add-update-teacher-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UpdateTeacherFormController,
    AddTeacherFormController,
    {
      provide: FormController, 
      useFactory: provideFormController,
    },
  ]
})
export class AddUpdateTeacherDialog {
  protected readonly formController = inject(FormController);
}
