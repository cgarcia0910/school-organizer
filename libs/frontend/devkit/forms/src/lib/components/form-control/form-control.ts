import { Component, inject, Input } from '@angular/core';
import { FormFilterType, FormModel, FormSelectType } from '../../types';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormGroup, FormArray } from '@angular/forms';
import { FormControl as FormControlAngular } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { FilterControl } from '../filter-control/filter-control';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormController } from '../../types/form-controller';

@Component({
  selector: 'lib-form-control',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule,  MatInput, MatSelectModule, AsyncPipe, FilterControl, ReactiveFormsModule, FormsModule,  MatInput, MatFormFieldModule, MatIconModule, MatButtonModule, MatSelectModule, AsyncPipe, FilterControl ],

  templateUrl: './form-control.html',
  styleUrl: './form-control.scss',
})
export class FormControl {
  @Input() field!: FormModel;
  @Input() form!: FormGroup;
  protected readonly formController = inject(FormController);

  get formControl(): FormControlAngular {
    return this.field.formControl as unknown as FormControlAngular;
  }
     // Métodos helper para type guards
     asSelectType(field: FormModel): FormSelectType {
      return field as FormSelectType;
    }
  
    asFilterType(field: FormModel): FormFilterType {
      return field as FormFilterType;
    }

    getFormArray(key: string): FormArray {
      return this.form.get(key) as FormArray; 
    } 

    addArrayElement(arrayKey: string): void {
      console.log('addArrayElement', arrayKey);
      this.formController.addArrayElement(arrayKey);
    }
    
    removeArrayElement(arrayKey: string, index: number): void {
      this.formController.removeArrayElement(arrayKey, index);
    }
}
