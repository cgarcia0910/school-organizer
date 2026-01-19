import { Habilitation } from './habilitation';


export interface Teacher { 
  id: number;
  name: string;
  habilitations?: Array<Habilitation>;
}

