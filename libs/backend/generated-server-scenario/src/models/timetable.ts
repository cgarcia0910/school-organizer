import { Course } from './course';
import { TimetableDayEntry } from './timetable-day-entry';


export interface Timetable { 
  courseId?: number;
  course?: Course;
  groupId?: number;
  hours: Array<Array<TimetableDayEntry>>;
}

