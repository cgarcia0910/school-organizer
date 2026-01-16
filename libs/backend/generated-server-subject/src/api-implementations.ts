import { Type } from '@nestjs/common';
import { SubjectApi } from './api';

/**
 * Provide this type to {@link ApiModule} to provide your API implementations
**/
export type ApiImplementations = {
  subjectApi: Type<SubjectApi>
};
