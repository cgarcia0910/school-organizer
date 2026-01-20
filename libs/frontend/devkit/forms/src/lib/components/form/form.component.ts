import { Component, inject } from '@angular/core';
import { FormController } from '../../types/form-controller';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '../form-control/form-control';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'lib-form',
  imports: [ReactiveFormsModule, FormsModule,  MatInput, MatFormFieldModule, FormControl, MatIconModule, MatButtonModule, MatSelectModule, AsyncPipe ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  protected readonly formController = inject(FormController);
  getFormArray(key: string): FormArray {
    return this.formController.form.get(key) as FormArray;
  } 

  addArrayElement(arrayKey: string): void {
    console.log('addArrayElement', arrayKey);
    this.formController.addArrayElement(arrayKey);
  }
  
  removeArrayElement(arrayKey: string, index: number): void {
    this.formController.removeArrayElement(arrayKey, index);
  }
}
