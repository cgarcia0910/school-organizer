import { Teacher } from './teacher';
import { Subject } from './subject';


export interface ScenarioCourseGroupTeacherAssignment { 
  teacher: Teacher;
  subject: Subject;
  hoursPerWeek?: number;
  maxDailyWorkload?: number;
}

