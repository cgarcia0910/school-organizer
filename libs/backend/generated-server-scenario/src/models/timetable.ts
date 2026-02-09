import { Course } from './course';
import { TimetableDayEntry } from './timetable-day-entry';
import { ScenarioCourseGroup } from './scenario-course-group';


export interface Timetable { 
  courseId?: number;
  course?: Course;
  group?: ScenarioCourseGroup;
  groupId?: number;
  hours: Array<Array<TimetableDayEntry>>;
}

