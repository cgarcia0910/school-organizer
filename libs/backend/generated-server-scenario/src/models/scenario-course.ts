import { Course } from './course';
import { ScenarioCourseGroup } from './scenario-course-group';


export interface ScenarioCourse { 
  course?: Course;
  groups?: Array<ScenarioCourseGroup>;
}

