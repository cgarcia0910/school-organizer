import { PaginationMeta } from './pagination-meta';
import { Habilitation } from './habilitation';


export interface PaginatedHabilitationResponse { 
  data: Array<Habilitation>;
  meta: PaginationMeta;
}

