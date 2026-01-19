import { provideApi as provideApiHabilitation } from '@organizer/habilitation-api';
import { provideApi as provideApiCourse } from '@organizer/course-api';
import { provideApi as provideApiSubject } from '@organizer/subject-api';
import { provideApi as provideApiTeacher } from '@organizer/teacher-api';

export const apiProviderConfig = [
  provideApiTeacher('api'),
  provideApiSubject('/api'),
  provideApiCourse('/api'),
  provideApiHabilitation('/api')



]