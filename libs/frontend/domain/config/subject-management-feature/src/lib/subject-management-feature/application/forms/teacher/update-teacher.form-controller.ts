import {  UpdateTeacherDto, Teacher } from '@organizer/generated-server-teacher';
import { TeacherFormController } from "./teacher.form-controller";
import { inject, Injectable, InjectionToken } from '@angular/core';
import { UPDATE_TEACHER } from '../../../domain';


@Injectable()
export class UpdateTeacherFormController extends TeacherFormController {
  private teacher = inject(UPDATE_TEACHER, { optional: true }) as Teacher;
    public override onSubmit(): void {
        this.teacherService.teacherIdPut(this.teacher.id, this.form.value as UpdateTeacherDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return inject(UPDATE_TEACHER, { optional: true }) as unknown as { [key: string]: unknown };
    }
}