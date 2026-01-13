import { FormControl } from "@angular/forms";
import { FormController, FormModel } from "@organizer/devkit/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AddUpdateTeacherDialog } from "./add-update-teacher-dialog";
import { inject } from "@angular/core";
import { CreateTeacherDto, TeacherService } from '@organizer/teacher-api';

export class TeacherFormController extends FormController {
  private teacherService = inject(TeacherService);
  private dialogRef = inject(MatDialogRef<AddUpdateTeacherDialog>);
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
    public onSubmit(): void {
        this.teacherService.teacherPost(this.form.value as CreateTeacherDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return {}
}}
