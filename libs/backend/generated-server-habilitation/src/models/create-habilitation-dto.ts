import { SubjectDto } from './subject-dto';


export interface CreateHabilitationDto { 
  name: string;
  course?: number;
  subjects?: Array<SubjectDto>;
}

