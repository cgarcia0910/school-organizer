import { CreateSubjectDto } from '@organizer/subject-api';
import { TeacherFormController } from "./teacher.form-controller";
import { Injectable } from '@angular/core';

@Injectable()
export class AddTeacherFormController extends TeacherFormController {
    public override onSubmit(): void {
        this.teacherService.subjectPost(this.form.value as CreateSubjectDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return {}
    }
}