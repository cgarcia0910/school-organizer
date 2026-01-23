import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormController } from '../types/form-controller';
import { FormModel } from '../types/form-model.type';

export interface FormContext {
  formController: FormController;
  field: FormModel;
}

@Directive({
  selector: '[libFormContext]',
})
export class FormContextDirective {
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<FormContext>);

  
  @Input('libFormContextField') field!: FormModel;
  @Input('libFormContextFormController') formController!: FormController;

  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      {
        $implicit: this.field,
        formController: this.formController,
      }
    );
  }
}
