import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent, FormController } from '@organizer/devkit/forms';
import { UpdateSubjectFormController, AddSubjectFormController } from '../../../application';

import { UPDATE_SUBJECT } from '../../../domain';
import { TranslocoPipe } from '@ngneat/transloco';

function provideFormController(): FormController {
  console.log('provideFormController', inject(UPDATE_SUBJECT, { optional: true }));
  return inject(UPDATE_SUBJECT, { optional: true })
    ? inject(UpdateSubjectFormController)
    : inject(AddSubjectFormController)
}

@Component({
  selector: 'lib-add-update-subject-dialog',
  imports: [ReactiveFormsModule, FormsModule,   MatDialogTitle, MatDialogActions,
    MatDialogContent, MatFormFieldModule, MatButtonModule, FormComponent, TranslocoPipe],
  templateUrl: './add-update-subject-dialog.html',
  styleUrl: './add-update-subject-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UpdateSubjectFormController,
    AddSubjectFormController,
    {
      provide: FormController, 
      useFactory: provideFormController,
    },
  ]
})
export class AddUpdateSubjectDialog {
  protected readonly formController = inject(FormController);
}
