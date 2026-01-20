import { SubjectWorkLoad } from './subject-work-load';


export interface Course { 
  id: number;
  name: string;
  subjects?: Array<SubjectWorkLoad>;
}

