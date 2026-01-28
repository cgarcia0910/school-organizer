import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicOption } from '../components/filter-control/filter-control';

// export type FormModel {
//     key: string
//     label: string
//     type: string
//     required: boolean
//     formControl: FormControl
//     children?: FormModel[]
//     options?: Observable<Array<{ value: number; label: string } | DynamicOption>>
// }

export type FormModel = FormInputType | FormSelectType | FormFilterType | FormArrayType;

export type FormInputType = {
    key: string
    label: string
    type: string
    required: boolean
    formControl: FormControl
    children?: FormModel[]
}

export type FormArrayType = {
    key: string
    label: string
    type: 'array'
    required: boolean
    formControl: FormControl
    children?: FormModel[]
}

export type FormSelectType = {
    key: string
    label: string
    type: 'select'
    required: boolean
    formControl: FormControl
    children?: FormModel[]
    options: Observable<Array<{ value: number; label: string }>>
}

export type FormFilterType = {
    key: string
    label: string
    type: 'filter'
    required: boolean
    formControl: FormControl
    children?: FormModel[]
    options: Observable<Array<DynamicOption>>
}