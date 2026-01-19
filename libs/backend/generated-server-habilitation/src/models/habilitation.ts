import { SubjectDto } from './subject-dto';


export interface Habilitation { 
  id: number;
  name: string;
  course?: number;
  subjects?: Array<SubjectDto>;
}

