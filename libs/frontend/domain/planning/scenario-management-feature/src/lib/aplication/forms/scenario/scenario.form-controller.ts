import { FormControl } from '@angular/forms';
import { FormArrayType, FormController, FormInputType, FormModel, FormSelectType } from '@organizer/devkit/forms';
import { inject, Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { CourseService } from '@organizer/course-api';
import { DynamicOption } from '@organizer/devkit/forms';
import { TeacherService } from '@organizer/teacher-api';

@Injectable()
export class ScenarioFormController extends FormController {
  protected readonly courseService = inject(CourseService);
  private readonly teacherService = inject(TeacherService);
  private allTeachers$: Observable<Array<{ value: number; label: string }>> = from(this.teacherService.teacherGet(1, 100)).pipe(
    map(teachers => teachers.data),
    map(teachers => teachers.map(teacher => ({
      value: teacher.id,
      label: teacher.name
    })))
  )
  private allCourses$: Observable<Array<DynamicOption>> = from(this.courseService.courseGet(1, 100)).pipe(
    map(courses => courses.data),
    map(courses => courses.map(course => ({ 
      label: course.name,
      value: course.id.toString(),
      fields: [{
        key: 'groups',
        label: 'Groups',
        type: 'array',
        required: true,
        formControl: new FormControl(''),
        children: [
          {
            key: 'groupName',
            label: 'Group Name',
            type: 'text',
            required: true,
            formControl: new FormControl(''),
          } as FormInputType,
          ...(course.subjects?.map(subject => ({
            key: subject.subject?.id?.toString() ?? '',
            label: subject.subject?.name ?? '',
            type: 'select' as const,
            required: true,
            formControl: new FormControl(''),
            options: this.allTeachers$
          } as FormSelectType)) ?? [])
        ]
      } as FormArrayType]
    } as DynamicOption)))
  );
    
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
      label: 'Courses',
      type: 'array',
      required: true,
      formControl: new FormControl(''),
      children: [
                {
          key: 'Course',
          label: 'Course',
          type: 'filter',
          required: true,
          formControl: new FormControl(''),
          options: this.allCourses$,
        } 
      ],
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
