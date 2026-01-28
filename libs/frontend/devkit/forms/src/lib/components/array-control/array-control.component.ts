import { Component, Input, TemplateRef } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { FormController, FormModel } from '../../types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FilterControl } from '../filter-control/filter-control';

@Component({
  selector: 'lib-array-control',
  imports: [ReactiveFormsModule,
    FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, AsyncPipe, FilterControl, NgTemplateOutlet],
  templateUrl: './array-control.component.html',
  styleUrl: './array-control.component.scss',
})
export class ArrayControlComponent {
  @Input() field!: FormModel;
  @Input() formController!: FormController;
  @Input() parentControl?: AbstractControl | null; // Para arrays anidados en FilterControl
  @Input() itemTemplate?: TemplateRef<any>; // Template para renderizar cada item
  
  getFormArray(key: string): FormArray | null {
    // Primero intentar desde el parent control (para arrays dentro de FilterControl)
    if (this.parentControl) {
      const control = this.parentControl.get(key);
      if (control instanceof FormArray) {
        return control;
      }
    }
    
    // Luego intentar desde el form principal
    const control = this.formController.form.get(key);
    if (control instanceof FormArray) {
      return control;
    }
    
    return null;
  }
  
  getParentFormGroup(): FormGroup {
    // Si hay un parentControl, usarlo (caso de FilterControl)
    if (this.parentControl instanceof FormGroup) {
      return this.parentControl;
    }
    
    // Si el parentControl es un FormArray, necesitamos su parent
    // Por defecto, usar el form principal
    return this.formController.form;
  } 

  addArrayElement(arrayKey: string): void {
    console.log('addArrayElement', arrayKey, 'parentControl:', this.parentControl);
    
    const parentFormGroup = this.getParentFormGroup();
    const formArray = parentFormGroup.get(arrayKey) as FormArray;
    
    if (!formArray) {
      console.error('FormArray not found:', arrayKey, 'in', parentFormGroup);
      return;
    }
    
    // Crear un nuevo FormGroup basado en los children del field
    const newGroup = this.createFormGroupFromFields(this.field.children || []);
    formArray.push(newGroup);
    console.log('Added element to array. New length:', formArray.length, 'Controls:', formArray.controls);
  }
  
  removeArrayElement(arrayKey: string, index: number): void {
    console.log('removeArrayElement', arrayKey, index);
    
    const parentFormGroup = this.getParentFormGroup();
    const formArray = parentFormGroup.get(arrayKey) as FormArray;
    
    if (!formArray) {
      console.error('FormArray not found:', arrayKey, 'in', parentFormGroup);
      return;
    }
    
    formArray.removeAt(index);
    console.log('Removed element from array. New length:', formArray.length);
  }
  
  private createFormGroupFromFields(fields: FormModel[]): FormGroup {
    const group: Record<string, AbstractControl> = {};
    
    fields.forEach(field => {
      if (field.type === 'array') {
        group[field.key] = new FormArray([]);
      } else if (field.type === 'filter') {
        // FilterControl crea su propia estructura
        group[field.key] = new FormControl(null);
      } else {
        group[field.key] = new FormControl(null);
      }
    });
    
    return new FormGroup(group);
  }
}
