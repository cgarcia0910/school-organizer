import { Injectable } from "@angular/core";
import { FormModel } from "./form-model.type";
import { FormGroup } from "@angular/forms";

@Injectable()
export abstract class FormController {
    public abstract getFields(): FormModel[];
    public abstract onSubmit(): void;
    protected abstract getModel(): { [key: string]: unknown };
    public form: FormGroup = new FormGroup(
        this.getFields().reduce((acc, curr: FormModel) => {
            acc[curr.key] = curr.formControl;
            return acc;
        }, {} as { [key: string]: any }),
    );
    constructor() {
        this.form.patchValue(this.getModel())
    }
}