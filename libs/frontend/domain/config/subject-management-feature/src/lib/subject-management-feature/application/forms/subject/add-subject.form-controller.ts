import { CreateSubjectDto } from '@organizer/subject-api';
import { Injectable } from '@angular/core';
import { SubjectFormController } from './subject.form-controller';

@Injectable()
export class AddSubjectFormController extends SubjectFormController {
    public override onSubmit(): void {
        this.subjectService.subjectPost(this.form.value as CreateSubjectDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return {}
    }
}