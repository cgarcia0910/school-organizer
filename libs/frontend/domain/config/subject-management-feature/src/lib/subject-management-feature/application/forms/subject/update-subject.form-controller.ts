import { SubjectFormController } from "./subject.form-controller";
import { inject, Injectable, InjectionToken } from '@angular/core';
import { UPDATE_SUBJECT } from '../../../domain';
import { Subject as SubjectModel, UpdateSubjectDto } from "@organizer/subject-api";


@Injectable()
export class UpdateSubjectFormController extends SubjectFormController {
  private subject = inject(UPDATE_SUBJECT, { optional: true }) as SubjectModel;
    public override onSubmit(): void {
        this.subjectService.subjectIdPut(this.subject.id, this.form.value as UpdateSubjectDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return this.subject as unknown as { [key: string]: unknown };
    }
}