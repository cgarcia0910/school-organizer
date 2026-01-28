import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent, FormController } from '@organizer/devkit/forms';
import { AddCourseFormController, UpdateCourseFormController } from '../../../application';
import { UPDATE_COURSE } from '../../../domain';
import { TranslocoPipe } from '@ngneat/transloco';

function provideFormController(): FormController {
  console.log('provideFormController', inject(UPDATE_COURSE, { optional: true }));
  return inject(UPDATE_COURSE, { optional: true })
    ? inject(UpdateCourseFormController)
    : inject(AddCourseFormController)
}

@Component({
  selector: 'lib-add-update-course-dialog',
  imports: [ReactiveFormsModule, FormsModule,   MatDialogTitle, MatDialogActions,
    MatDialogContent, MatFormFieldModule, MatButtonModule, FormComponent, TranslocoPipe],
  templateUrl: './add-update-course-dialog.html',
  styleUrl: './add-update-course-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UpdateCourseFormController,
    AddCourseFormController,
    {
      provide: FormController, 
      useFactory: provideFormController,
    },
  ]
})
export class AddUpdateCourseDialog {
  protected readonly formController = inject(FormController);
}
