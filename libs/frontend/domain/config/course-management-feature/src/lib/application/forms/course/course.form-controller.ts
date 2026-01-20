import { FormControl } from "@angular/forms";
import { FormController, FormModel } from "@organizer/devkit/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { inject, Injectable } from "@angular/core";
import { SubjectService } from "@organizer/subject-api";
import { from, map, Observable } from "rxjs";
import { CourseService } from "@organizer/course-api";
import { AddUpdateCourseDialog } from "../../../delivery/components";

@Injectable()
export class CourseFormController extends FormController {
  protected readonly courseService = inject(CourseService);
  protected readonly dialogRef = inject(MatDialogRef<AddUpdateCourseDialog>);
  private readonly subjectService = inject(SubjectService);
  private readonly availableSubjects$: Observable<Array<{ value: number; label: string }>> = from(this.subjectService.subjectGet(1, 100)).pipe(
    map(subjects => subjects.data),
    map((response) => response.map((subject) => ({ value: subject.id, label: subject.name }))),
  );
  private formModel: FormModel[] =  [
    {
        key: 'name',
        label: 'Names',
        type: 'text',
        required: true,
        formControl: new FormControl(''),
    },
    {
      key: 'subjects',
      label: 'Subjects',
      type: 'array',
      required: true,
      formControl: new FormControl(''),
      children: [
        {
          key: 'subject',
          label: 'Subject',
          type: 'select',
          required: true,
          formControl: new FormControl(''),
          options: this.availableSubjects$,
          },
          {
            key: 'hoursPerWeek',
            label: 'Hours per week',
            type: 'number',
            required: true,
            formControl: new FormControl(''),
          },
          {
            key: 'maxDailyWorkload',
            label: 'Max daily workload',
            type: 'number',
            required: true,
            formControl: new FormControl(''),
          },
  ]
}
  ];
    public getFields(): FormModel[] {
        return this.formModel;
    }
    public override onSubmit(): void {}
    protected override getModel(): { [key: string]: unknown } {
        return {}
    }
}
