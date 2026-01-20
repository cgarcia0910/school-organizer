import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FormModel {
    key: string
    label: string
    type: string
    required: boolean
    formControl: FormControl
    children?: FormModel[]
    options?: Observable<Array<{ value: number; label: string }>>
}
