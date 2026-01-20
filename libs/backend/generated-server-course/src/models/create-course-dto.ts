import { SubjectWorkLoad } from './subject-work-load';


export interface CreateCourseDto { 
  name: string;
  subjectWorkLoads?: Array<SubjectWorkLoad>;
}

