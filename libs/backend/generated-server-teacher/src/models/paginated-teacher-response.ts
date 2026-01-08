import { PaginationMeta } from './pagination-meta';
import { Teacher } from './teacher';


export interface PaginatedTeacherResponse { 
  data: Array<Teacher>;
  meta: PaginationMeta;
}

