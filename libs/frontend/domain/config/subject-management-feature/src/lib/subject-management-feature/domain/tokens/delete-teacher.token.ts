import { InjectionToken } from "@angular/core";
import { Teacher } from "@organizer/generated-server-teacher";

export const DELETE_SUBJECT = new InjectionToken<Teacher>('DELETE_SUBJECT');
