import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormSelectType, FormInputType } from '../../types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

export interface DynamicOption {
  label: string;
  value: string;
  fields: Array<FormInputType | FormSelectType>;
}

export interface DynamicField {
  key: string;
  formControl: FormControl;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  required?: boolean;
  options?: Observable<Array<{ label: string; value: number }>>;
}

@Component({
  selector: 'lib-filter-control',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AsyncPipe
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
  selectedFields: Array<FormInputType | FormSelectType> = [];

  // Type guard helper
  asSelectType(field: FormInputType | FormSelectType): FormSelectType {
    return field as FormSelectType;
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private fb: FormBuilder) {}

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

    this.selectedFields = option?.fields ?? [];

    const valuesGroup = this.fb.group({});

    this.selectedFields.forEach(field => {
      valuesGroup.addControl(
        field.key,
        this.fb.control(null)
      );
    });

    this.form.setControl('values', valuesGroup);
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
