import { CreateScenarioCourseGroup } from './create-scenario-course-group';


export interface CreateScenarioCourse { 
  courseId: number;
  groups?: Array<CreateScenarioCourseGroup>;
}

