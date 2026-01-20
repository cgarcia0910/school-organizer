import { TeacherFormController } from "./teacher.form-controller";
import { inject, Injectable } from '@angular/core';
import { UPDATE_COURSE } from '../../../domain';
import { Course, UpdateCourseDto } from '@organizer/course-api';


@Injectable()
export class UpdateTeacherFormController extends TeacherFormController {
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
      console.log({
        name: this.course.name,
        subjects: this.course.subjects?.map((subject) => ({
          subject: subject.subject?.id,
          hoursPerWeek: subject.workload?.hoursPerWeek,
          maxDailyWorkload: subject.workload?.maxDailyWorkload,
        })),
      });
      return {
        name: this.course.name,
        subjects: this.course.subjects?.map((subject) => ({
          subject: subject.subject?.id,
          hoursPerWeek: subject.workload?.hoursPerWeek,
          maxDailyWorkload: subject.workload?.maxDailyWorkload,
        })),
      }
      // return inject(UPDATE_COURSE, { optional: true }) as unknown as { [key: string]: unknown };
      // return this.course as unknown as { [key: string]: unknown };
    }
}