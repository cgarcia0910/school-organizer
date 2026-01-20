import { TeacherFormController } from "./teacher.form-controller";
import { Injectable } from '@angular/core';
import { CreateCourseDto } from '@organizer/course-api';

@Injectable()
export class AddTeacherFormController extends TeacherFormController {
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