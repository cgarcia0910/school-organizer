import { InjectionToken } from "@angular/core";
import { Teacher } from "@organizer/generated-server-teacher";

export const UPDATE_TEACHER = new InjectionToken<Teacher>('UPDATE_TEACHER');
