
import { TeacherFormController } from "./teacher.form-controller";
import { inject, Injectable, InjectionToken } from '@angular/core';
import { UPDATE_TEACHER } from '../../../domain';
import { Subject as SubjectModel, UpdateSubjectDto } from "@organizer/subject-api";


@Injectable()
export class UpdateTeacherFormController extends TeacherFormController {
  private teacher = inject(UPDATE_TEACHER, { optional: true }) as SubjectModel;
    public override onSubmit(): void {
        this.teacherService.subjectIdPut(this.teacher.id, this.form.value as UpdateSubjectDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return inject(UPDATE_TEACHER, { optional: true }) as unknown as { [key: string]: unknown };
    }
}