import { PaginationMeta } from './pagination-meta';
import { Course } from './course';


export interface PaginatedCourseResponse { 
  data: Array<Course>;
  meta: PaginationMeta;
}

