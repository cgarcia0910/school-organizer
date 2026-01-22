import { Component, inject } from '@angular/core';
import { FormController } from '../../types/form-controller';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { FilterControl } from '../filter-control/filter-control';
import { FormModel, FormSelectType, FormFilterType } from '../../types';
import { FormControl as FormControlComponent } from '../form-control/form-control';
@Component({
  selector: 'lib-form',
  imports: [ReactiveFormsModule, FormsModule,  MatInput, FormControlComponent, MatFormFieldModule, MatIconModule, MatButtonModule, MatSelectModule, AsyncPipe, FilterControl ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  protected readonly formController = inject(FormController);
  getFormArray(key: string): FormArray {
    return this.formController.form.get(key) as FormArray;
  } 

   // Métodos helper para type guards
   asSelectType(field: FormModel): FormSelectType {
    return field as FormSelectType;
  }

  asFilterType(field: FormModel): FormFilterType {
    return field as FormFilterType;
  }

  addArrayElement(arrayKey: string): void {
    console.log('addArrayElement', arrayKey);
    this.formController.addArrayElement(arrayKey);
  }
  
  removeArrayElement(arrayKey: string, index: number): void {
    this.formController.removeArrayElement(arrayKey, index);
  }
}
