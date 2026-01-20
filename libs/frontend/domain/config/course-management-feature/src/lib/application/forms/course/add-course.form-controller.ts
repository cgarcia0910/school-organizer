
import { Injectable } from '@angular/core';
import { CreateCourseDto } from '@organizer/course-api';
import { CourseFormController } from './course.form-controller';

@Injectable()
export class AddCourseFormController extends CourseFormController {
    public override onSubmit(): void {
      console.log(this.form.value);
      const createCourseDto: CreateCourseDto = {
        name: this.form.value['name'],
        subjectWorkLoads: this.form.value['subjects'].map((subject: any) => ({
          subject: { id: subject.subject },
          workload: { hoursPerWeek: subject.hoursPerWeek, maxDailyWorkload: subject.maxDailyWorkload },
        })),
      };
      this.courseService.coursePost(createCourseDto).subscribe((response) => {
            this.dialogRef.close(true);
          }, (error) => {
            this.dialogRef.close(false);
          });
    }
    protected override getModel(): { [key: string]: unknown } {
      return {}
    }
}