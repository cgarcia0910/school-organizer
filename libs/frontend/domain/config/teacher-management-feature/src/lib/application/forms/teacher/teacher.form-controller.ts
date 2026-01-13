import { FormControl } from "@angular/forms";
import { FormController, FormModel } from "@organizer/devkit/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { inject, Injectable } from "@angular/core";
import { TeacherService } from '@organizer/teacher-api';
import { AddUpdateTeacherDialog } from "../../../delivery/components/add-update-teacher-dialog/add-update-teacher-dialog";

@Injectable()
export class TeacherFormController extends FormController {
  protected readonly teacherService = inject(TeacherService);
  protected readonly dialogRef = inject(MatDialogRef<AddUpdateTeacherDialog>);
    public getFields(): FormModel[] {
        return [
            {
                key: 'name',
                label: 'Names',
                type: 'text',
                required: true,
                formControl: new FormControl(''),
            },
        ];
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
