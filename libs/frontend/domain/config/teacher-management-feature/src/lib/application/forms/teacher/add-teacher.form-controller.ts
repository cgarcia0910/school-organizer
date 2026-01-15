import { CreateTeacherDto } from '@organizer/teacher-api';
import { TeacherFormController } from "./teacher.form-controller";
import { Injectable } from '@angular/core';

@Injectable()
export class AddTeacherFormController extends TeacherFormController {
    public override onSubmit(): void {
        this.teacherService.teacherPost(this.form.value as CreateTeacherDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return {}
    }
}