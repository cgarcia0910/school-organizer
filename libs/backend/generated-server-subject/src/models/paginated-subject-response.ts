import { PaginationMeta } from './pagination-meta';
import { Subject } from './subject';


export interface PaginatedSubjectResponse { 
  data: Array<Subject>;
  meta: PaginationMeta;
}

