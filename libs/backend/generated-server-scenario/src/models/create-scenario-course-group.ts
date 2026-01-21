import { CreateScenarioCourseGroupTeacherAssignment } from './create-scenario-course-group-teacher-assignment';


export interface CreateScenarioCourseGroup { 
  groupName: string;
  teacherAssignments?: Array<CreateScenarioCourseGroupTeacherAssignment>;
}

