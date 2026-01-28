import { FormControl } from "@angular/forms";
import { FormController, FormModel } from "@organizer/devkit/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { inject, Injectable } from "@angular/core";
import { SubjectService } from "@organizer/subject-api";
import { AddUpdateSubjectDialog } from "../../../delivery/components/add-update-subject-dialog/add-update-subject-dialog";

@Injectable()
export class SubjectFormController extends FormController {
  protected readonly subjectService = inject(SubjectService);
  protected readonly dialogRef = inject(MatDialogRef<AddUpdateSubjectDialog>);
  private formModel: FormModel[] =  [
    {
        key: 'name',
        label: 'Names',
        type: 'text',
        required: true,
        formControl: new FormControl(''),
    },
  ];
    public getFields(): FormModel[] {
        return this.formModel;
    }
    public override onSubmit(): void {}
    protected override getModel(): { [key: string]: unknown } {
        return {}
    }
    // public onSubmit(): void {
    //     this.teacherService.teacherPost(this.form.value as CreateTeacherDto).subscribe((response) => {
    //         this.dialogRef.close(true);
    //       }, (error) => {
    //         this.dialogRef.close(false);
    //       });
    // }
    // protected override getModel(): { [key: string]: unknown } {
    //   return {}
}
