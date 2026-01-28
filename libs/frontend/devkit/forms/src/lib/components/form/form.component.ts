import { Component, inject } from '@angular/core';
import { FormController } from '../../types/form-controller';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { DynamicOption, FilterControl } from '../filter-control/filter-control';
import { FormControl as FormControlComponent } from '../form-control/form-control';
import { FormFilterType, FormModel, FormSelectType } from '../../types/form-model.type';
import { NgTemplateOutlet } from '@angular/common';
import { FormContextDirective } from '../../directives';
import { ArrayControlComponent } from '../array-control/array-control.component';


@Component({
  selector: 'lib-form',
  imports: [ NgTemplateOutlet,
     ReactiveFormsModule,
     FormsModule,
      MatInput,
     FormControlComponent,
     MatFormFieldModule,
     MatIconModule,
     MatButtonModule,
     MatSelectModule,
     AsyncPipe,
     FilterControl,
     MatInputModule,
     JsonPipe,
     FormContextDirective,
     ArrayControlComponent
     ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  protected readonly formController = inject(FormController);

  // get formControl(): FormControlAngular {
  //   return this.field.formControl as unknown as FormControlAngular;
  // }
     // Métodos helper para type guards
     asSelectType(field: FormModel): FormSelectType {
      return field as FormSelectType;
    }
  
    asFilterType(field: FormModel): FormFilterType {
      return field as FormFilterType;
    }

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

    getOptionFields(options: DynamicOption[], key: string): FormModel[] {
      return options.find(option => option.value === key)?.fields ?? [];
    }
    print(value: any): void {
      console.log('print', value);
    }
}
