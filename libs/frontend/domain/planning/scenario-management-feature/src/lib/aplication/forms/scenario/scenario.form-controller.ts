import { FormControl } from '@angular/forms';
import { FormController, FormModel } from '@organizer/devkit/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { inject, Injectable } from '@angular/core';
import { SubjectService } from '@organizer/subject-api';
import { from, map, Observable, of } from 'rxjs';
import { CourseService } from '@organizer/course-api';
import { DynamicOption } from '@organizer/devkit/forms';

@Injectable()
export class ScenarioFormController extends FormController {
  // protected readonly courseService = inject(CourseService);
  // protected readonly dialogRef = inject(MatDialogRef<AddUpdateCourseDialog>);
  // private readonly subjectService = inject(SubjectService);
  // private readonly availableSubjects$: Observable<Array<{ value: number; label: string }>> = from(this.subjectService.subjectGet(1, 100)).pipe(
  //   map(subjects => subjects.data),
  //   map((response) => response.map((subject) => ({ value: subject.id, label: subject.name }))),
  // );
  private formModel: FormModel[] = [
    {
      key: 'name',
      label: 'Names',
      type: 'text',
      required: true,
      formControl: new FormControl(''),
    },
    {
      key: 'courses',
      label: 'Subjects',
      type: 'array',
      required: true,
      formControl: new FormControl(''),
      // children: [
      //   {
      //     key: 'course',
      //     label: 'Course',
      //     type: 'select',
      //     required: true,
      //     formControl: new FormControl(''),
      //     options: of([{ label: 'Course 1', value: 1 }, { label: 'Course 2', value: 2 }]),
      //   },
      //   {
      //     key: 'groups',
      //     label: 'Groups',
      //     type: 'array',
      //     required: true,
      //     formControl: new FormControl(''),
      //     children: [
      //       {
      //         key: 'groupName',
      //         label: 'Group Name',
      //         type: 'text',
      //         required: true,
      //         formControl: new FormControl(''),
      //       },
      //       {
      //         key: 'teacherAssignments',
      //         label: 'Teacher Assignments',
      //         type: 'select',
      //         required: true,
      //         formControl: new FormControl(''),
      //         options: of([{ label: 'Teacher 1', value: 1 }, { label: 'Teacher 2', value: 2 }]),
      //       }
      //     ]
      //   }
      // ]
      children: [
        {
          key: 'Course',
          label: 'Course',
          type: 'filter',
          required: true,
          formControl: new FormControl(''),
          options: of([
            { label: 'Course1', value: '1', fields: [
                {
                  key: 'groups',
                  type: 'array',
                  required: true, formControl: new FormControl(''),
                  children: [
                    { 
                      key: '1', label: 'Maths', type: 'select', formControl: new FormControl(''), options: of([
                        { label: 'Teacher 1', value: 1 },
                        { label: 'Teacher 2', value: 2 },
                      ]) 
                    },
                    { 
                      key: '2', label: 'Science', type: 'select', formControl: new FormControl(''), options: of([
                        { label: 'Teacher 1', value: 1 },
                        { label: 'Teacher 2', value: 2 },
                      ]) 
                    },
                  ]
                },
              ] 
            },
            { label: 'Course2', value: '2', fields: [
              { key: 'teacher', label: 'prueba', type: 'select', formControl: new FormControl(''), options: of([
                { label: 'Teacher 1', value: 1 },
                { label: 'Teacher 2', value: 2 },
              ]) },
            ] 
            },
          ] as DynamicOption[]
        ),
        },
      ],
      // children: [
      //   {
      //     key: 'Course',
      //     label: 'Course',
      //     type: 'filter',
      //     required: true,
      //     formControl: new FormControl(''),
      //     options: of([
      //       { label: 'Course1', value: '1', fields: [
      //           { 
      //             key: '1', label: 'Maths', type: 'select', formControl: new FormControl(''), options: of([
      //               { label: 'Teacher 1', value: 1 },
      //               { label: 'Teacher 2', value: 2 },
      //             ]) 
      //           },
      //           { 
      //             key: '2', label: 'Science', type: 'select', formControl: new FormControl(''), options: of([
      //               { label: 'Teacher 1', value: 1 },
      //               { label: 'Teacher 2', value: 2 },
      //             ]) 
      //           },
      //         ] 
      //       },
      //       { label: 'Course2', value: '2', fields: [
      //         { key: 'teacher', label: 'prueba', type: 'select', formControl: new FormControl(''), options: of([
      //           { label: 'Teacher 1', value: 1 },
      //           { label: 'Teacher 2', value: 2 },
      //         ]) },
      //       ] 
      //       },
      //     ] as DynamicOption[]
      //   ),
      //   },
      // ],
    },
  ];
  public getFields(): FormModel[] {
    return this.formModel;
  }
  public override onSubmit(): void {}
  protected override getModel(): { [key: string]: unknown } {
    return {};
  }
}
