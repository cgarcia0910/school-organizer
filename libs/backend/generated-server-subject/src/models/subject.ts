import { SubjectCoursesInner } from './subject-courses-inner';


export interface Subject { 
  id: number;
  name: string;
  courses?: Array<SubjectCoursesInner>;
}

