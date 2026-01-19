import { Habilitation } from './habilitation';


export interface CreateTeacherDto { 
  name: string;
  habilitations?: Array<Habilitation>;
}

