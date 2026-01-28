import { TimetableHourEntry } from './timetable-hour-entry';


export interface Timetable { 
  courseId?: number;
  groupId?: number;
  hours: Array<TimetableHourEntry>;
}

