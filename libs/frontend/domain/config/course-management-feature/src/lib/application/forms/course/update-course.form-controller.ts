import { inject, Injectable } from '@angular/core';
import { UPDATE_COURSE } from '../../../domain';
import { Course, UpdateCourseDto } from '@organizer/course-api';
import { CourseFormController } from './course.form-controller';


@Injectable()
export class UpdateCourseFormController extends CourseFormController {
  private course = inject(UPDATE_COURSE, { optional: true }) as Course;
    public override onSubmit(): void {
      const updateCourseDto: UpdateCourseDto = {
        name: this.form.value['name'],
        subjectWorkLoads: this.form.value['subjects'].map((subject: any) => ({
          subject: { id: subject.subject },
          workload: { hoursPerWeek: Number(subject.hoursPerWeek), maxDailyWorkload: Number(subject.maxDailyWorkload) },
        })),
      };
      this.courseService.courseIdPut(this.course.id, updateCourseDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return {
        name: this.course.name,
        subjects: this.course.subjects?.map((subject) => ({
          subject: subject.subject?.id,
          hoursPerWeek: subject.workload?.hoursPerWeek,
          maxDailyWorkload: subject.workload?.maxDailyWorkload,
        })),
      }
    }
}