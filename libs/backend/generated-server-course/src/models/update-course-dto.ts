import { SubjectWorkLoad } from './subject-work-load';


export interface UpdateCourseDto { 
  name?: string;
  subjectWorkLoads?: Array<SubjectWorkLoad>;
}

