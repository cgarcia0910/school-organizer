
import { inject, Injectable } from '@angular/core';
import { ScenarioFormController } from './scenario.form-controller';
import { CreateScenarioDto, ScenarioService } from '@organizer/scenario-api';
import { DialogRef } from '@angular/cdk/dialog';

@Injectable()
export class AddScenarioFormController extends ScenarioFormController {
  protected readonly scenarioService = inject(ScenarioService);
  private readonly dialogRef = inject(DialogRef);
    public override onSubmit(): void {
      console.log(this.form.value);
      const createScenarioDto: CreateScenarioDto = {
        name: this.form.value['name'],
        courses: this.form.value['courses'].map((course: any) => ({
          courseId: course.Course.type,
          groups: course.Course.groups.map((group: any) => ({
            groupName: group.groupName,
            teacherAssignments: Object.keys(group).filter(key => key !== 'groupName').map((subject: any) => ({
              teacherId: group[subject],
              subjectId: subject,
            })),
          })),
        })),
      }
      console.log({createScenarioDto});
      this.scenarioService.scenarioPost(createScenarioDto).subscribe((response) => {
        this.dialogRef.close(true);
      }, (error) => {
        console.error({error});
        this.dialogRef.close(false);
      });
    }
    protected override getModel(): { [key: string]: unknown } {
      return {}
    }
}