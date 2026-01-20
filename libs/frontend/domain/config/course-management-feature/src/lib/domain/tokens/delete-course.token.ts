import { InjectionToken } from "@angular/core";
import { Teacher } from "@organizer/generated-server-teacher";

export const DELETE_COURSE = new InjectionToken<Teacher>('DELETE_COURSE');
