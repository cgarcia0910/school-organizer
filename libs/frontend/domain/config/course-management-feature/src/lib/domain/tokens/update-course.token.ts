import { InjectionToken } from "@angular/core";
import { Course } from "@organizer/course-api";

export const UPDATE_COURSE = new InjectionToken<Course>('UPDATE_COURSE');
