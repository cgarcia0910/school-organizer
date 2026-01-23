import { Injectable } from "@angular/core";
import { FormModel } from "./form-model.type";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Injectable()
export abstract class FormController {
    public abstract getFields(): FormModel[];
    public abstract onSubmit(): void;
    protected abstract getModel(): { [key: string]: unknown };
    private _form?: FormGroup;

    private buildFormGroup(fields: FormModel[]): FormGroup {
        return new FormGroup(
            fields.reduce((acc, curr: FormModel) => {
                if (curr.type === 'array') {
                    acc[curr.key] = this.buildFormArray(curr.children || [], curr.key);
                } else if (curr.type === 'filter') {
                    acc[curr.key] = this.buildFormFilter(curr.children || []);
                } else {
                    acc[curr.key] = curr.formControl;
                }
                return acc;
            }, {} as { [key: string]: any }),
        );
    }
    
    private buildFormArray(fields: FormModel[], arrayKey: string): FormArray {
        // Obtener los datos del modelo para este array
        const modelData = this.getModel();
        const arrayData = (modelData[arrayKey] as any[]) || [];
        
        // Si hay datos, crear un FormGroup por cada elemento
        if (arrayData.length > 0) {
            const formGroups = arrayData.map(() => this.createFormGroupFromFields(fields));
            return new FormArray(formGroups);
        }
        
        // Si no hay datos, crear un FormArray con un FormGroup vacío
        const formGroup = this.createFormGroupFromFields(fields);
        return new FormArray([formGroup]);
    }

    private buildFormFilter(fields: FormModel[]): FormGroup {
        return new FormGroup(
            fields.reduce((acc, curr: FormModel) => {
                acc[curr.key] = new FormControl('');
                return acc;
            }, {} as { [key: string]: any })
        );
    }

    private createFormGroupFromFields(fields: FormModel[]): FormGroup {
        return new FormGroup(
            fields.reduce((acc, curr: FormModel) => {
                // Crear una nueva instancia de FormControl vacía
                acc[curr.key] = new FormControl('');
                return acc;
            }, {} as { [key: string]: any })
        );
    }

    private patchFormValues(form: FormGroup, model: { [key: string]: unknown }): void {
        const fields = this.getFields();
        
        // Primero patch los valores no-array
        const nonArrayModel: any = {};
        Object.keys(model).forEach(key => {
            const field = fields.find(f => f.key === key);
            if (!field || field.type !== 'array') {
                nonArrayModel[key] = model[key];
            }
        });
        form.patchValue(nonArrayModel);
        
        // Luego patch manualmente cada FormArray
        fields.forEach(field => {
            if (field.type === 'array' && model[field.key]) {
                const formArray = form.get(field.key) as FormArray;
                const arrayData = model[field.key] as any[];
                
                arrayData.forEach((item, index) => {
                    if (formArray.at(index)) {
                        formArray.at(index).patchValue(item);
                    }
                });
            }
        });
    }

    public addArrayElement(arrayKey: string): void {
        const field = this.getFields().find(f => f.key === arrayKey && f.type === 'array');
        if (!field || !field.children) {
            return;
        }
        
        const formArray = this.form.get(arrayKey) as FormArray;
        const newGroup = this.createFormGroupFromFields(field.children);
        formArray.push(newGroup);
    }
    
    public removeArrayElement(arrayKey: string, index: number): void {
        const formArray = this.form.get(arrayKey) as FormArray;
        formArray.removeAt(index);
    }
    
    public get form(): FormGroup {
        if (!this._form) {
            this._form = this.buildFormGroup(this.getFields())
            console.log('Form structure:', this._form);
            
            const model = this.getModel();
            console.log('Model data:', model);
            
            this.patchFormValues(this._form, model);
            console.log('Form after patch:', this._form.value);
        }
        return this._form;
    }
}