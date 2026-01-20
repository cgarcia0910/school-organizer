import { InjectionToken } from "@angular/core";
import { Course } from "@organizer/course-api";

export const DELETE_COURSE = new InjectionToken<Course>('DELETE_COURSE');
