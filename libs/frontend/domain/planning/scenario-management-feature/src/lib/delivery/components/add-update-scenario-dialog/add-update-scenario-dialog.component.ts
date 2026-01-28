import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from '@organizer/devkit/forms';
import { FormController } from '@organizer/devkit/forms';
import { AddScenarioFormController } from '../../../aplication';

@Component({
  selector: 'lib-add-update-scenario-dialog',
  imports: [MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatButtonModule, FormComponent],
  templateUrl: './add-update-scenario-dialog.component.html',
  styleUrl: './add-update-scenario-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FormController, 
      useClass: AddScenarioFormController,
    },
  ]
})
export class AddUpdateScenarioDialogComponent {
  protected readonly formController = inject(FormController); 
}
