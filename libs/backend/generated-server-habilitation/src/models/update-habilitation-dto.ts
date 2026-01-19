import { SubjectDto } from './subject-dto';


export interface UpdateHabilitationDto { 
  name?: string;
  course?: number;
  subjects?: Array<SubjectDto>;
}

