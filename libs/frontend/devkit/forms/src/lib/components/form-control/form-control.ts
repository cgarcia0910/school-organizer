import { Component, Input } from '@angular/core';
import { FormModel } from '../../types';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControl as FormControlAngular } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-form-control',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule,  MatInput, MatSelectModule, AsyncPipe ],
  templateUrl: './form-control.html',
  styleUrl: './form-control.scss',
})
export class FormControl {
  @Input() field!: FormModel;
  get formControl(): FormControlAngular {
    return this.field.formControl as unknown as FormControlAngular;
  }
}
