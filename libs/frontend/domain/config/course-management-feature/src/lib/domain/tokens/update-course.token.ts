import { InjectionToken } from "@angular/core";
import { Teacher } from "@organizer/generated-server-teacher";

export const UPDATE_COURSE = new InjectionToken<Teacher>('UPDATE_COURSE');
