import { TimetableDayEntry } from './timetable-day-entry';


export interface Timetable { 
  courseId?: number;
  groupId?: number;
  hours: Array<Array<TimetableDayEntry>>;
}

