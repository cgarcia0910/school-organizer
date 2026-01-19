import { InjectionToken } from "@angular/core";
import { Teacher } from "@organizer/generated-server-teacher";

export const DELETE_TEACHER = new InjectionToken<Teacher>('DELETE_TEACHER');
