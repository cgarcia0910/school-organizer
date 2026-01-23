import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, forwardRef, Input, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormSelectType, FormInputType, FormModel } from '../../types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

export interface DynamicOption {
  label: string;
  value: string;
  fields: Array<FormModel>;
}

export interface DynamicField {
  key: string;
  formControl: FormControl;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  required?: boolean;
  options?: Observable<Array<DynamicOption>>;
}

@Component({
  selector: 'lib-filter-control',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './filter-control.html',
  styleUrl: './filter-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterControl),
      multi: true
    }
  ]
})
export class FilterControl implements ControlValueAccessor, OnInit {
  @Input() options: DynamicOption[] = [];

  form!: FormGroup;
  private _selectedFields: Array<FormInputType | FormSelectType> = [];
  
  // Getter público para que el template padre pueda acceder
  get selectedFields(): Array<FormInputType | FormSelectType> {
    return this._selectedFields;
  }

  // Type guard helper
  asSelectType(field: FormInputType | FormSelectType): FormSelectType {
    return field as FormSelectType;
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: null,
      values: this.fb.group({})
    });

    this.form.get('type')!.valueChanges.subscribe(type => {
      this.onTypeChange(type);
    });

    this.form.valueChanges.subscribe(value => {
      console.log('valueChanges', value);
      this.onChange(value);
    });
  }

  onTypeChange(type: string | null): void {
    const option = this.options.find(o => o.value === type);

    this._selectedFields = option?.fields ?? [];

    const valuesGroup = this.fb.group({});

    this._selectedFields.forEach(field => {
      if (field.type === 'array') {
        // Crear un FormArray para campos de tipo array
        const formArray = this.fb.array([this.createFormGroupForArray(field.children || [])]);
        valuesGroup.addControl(field.key, formArray);
      } else {
        valuesGroup.addControl(field.key, this.fb.control(null));
      }
    });

    this.form.setControl('values', valuesGroup);
    
    // Notificar cambio para que Angular detecte los nuevos campos
    this.cdr.markForCheck();
  }

  private createFormGroupForArray(children: FormModel[]): FormGroup {
    const group: any = {};
    children.forEach(child => {
      if (child.type === 'array') {
        // Soporte para arrays anidados
        group[child.key] = this.fb.array([this.createFormGroupForArray(child.children || [])]);
      } else {
        group[child.key] = this.fb.control('');
      }
    });
    return this.fb.group(group);
  }

  // ===== CVA =====

  writeValue(value: any): void {
    console.log('writeValue', value);
    if (!value) return;

    this.form.patchValue({ type: value.type });
    this.onTypeChange(value.type);

    if (value.values) {
      this.form.get('values')?.patchValue(value.values);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
