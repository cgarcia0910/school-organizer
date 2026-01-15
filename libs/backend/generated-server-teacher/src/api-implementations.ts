import { Type } from '@nestjs/common';
import { TeacherApi } from './api';

/**
 * Provide this type to {@link ApiModule} to provide your API implementations
**/
export type ApiImplementations = {
  teacherApi: Type<TeacherApi>
};
