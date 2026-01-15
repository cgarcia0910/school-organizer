import { Component, inject } from '@angular/core';
import { FormController } from '../../types/form-controller';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'lib-form',
  imports: [ReactiveFormsModule, FormsModule,  MatInput, MatFormFieldModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  protected readonly formController = inject(FormController);
}
