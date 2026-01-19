import { Habilitation } from './habilitation';


export interface UpdateTeacherDto { 
  name?: string;
  habilitations?: Array<Habilitation>;
}

