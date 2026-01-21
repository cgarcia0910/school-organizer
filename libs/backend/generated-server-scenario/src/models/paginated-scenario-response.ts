import { PaginationMeta } from './pagination-meta';
import { Scenario } from './scenario';


export interface PaginatedScenarioResponse { 
  data: Array<Scenario>;
  meta: PaginationMeta;
}

