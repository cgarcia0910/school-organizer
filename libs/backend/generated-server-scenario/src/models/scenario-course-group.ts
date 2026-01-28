import { ScenarioCourseGroupTeacherAssignment } from './scenario-course-group-teacher-assignment';


export interface ScenarioCourseGroup { 
  id: number;
  groupName: string;
  teacherAssignments?: Array<ScenarioCourseGroupTeacherAssignment>;
}

