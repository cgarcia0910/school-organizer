import { FormControl } from '@angular/forms';

export interface FormModel {
    key: string
    label: string
    type: string
    required: boolean
    formControl: FormControl
}
