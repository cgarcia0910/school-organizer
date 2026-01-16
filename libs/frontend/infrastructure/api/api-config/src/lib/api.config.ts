import { provideApi as provideApiSubject } from '@organizer/subject-api';
import { provideApi as provideApiTeacher } from '@organizer/teacher-api';

export const apiProviderConfig = [
  provideApiTeacher('api'),
  provideApiSubject('/api')

]