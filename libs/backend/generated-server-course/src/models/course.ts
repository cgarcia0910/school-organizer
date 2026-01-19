import { SubjectDto } from './subject-dto';


export interface Course { 
  id: number;
  name: string;
  subjects?: Array<SubjectDto>;
}

