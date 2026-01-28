import { InjectionToken } from "@angular/core";
import { Teacher } from "@organizer/generated-server-teacher";

export const UPDATE_SUBJECT = new InjectionToken<Teacher>('UPDATE_SUBJECT');
