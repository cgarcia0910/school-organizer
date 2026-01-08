import { Injectable } from "@nestjs/common";
import { 
  TeacherApi,
  PaginatedTeacherResponse,
  UpdateTeacherDto,
  CreateTeacherDto,
  Teacher,
} from "@organizer/generated-server-teacher"; 
import { Observable } from "rxjs";
import { TeacherService } from "../services/teacher.service";

@Injectable()
export class TeacherApiService extends TeacherApi {
  override teacherGet(page: number, limit: number, request: Request): PaginatedTeacherResponse | Promise<PaginatedTeacherResponse> | Observable<PaginatedTeacherResponse> {
    return this.teacherService.teacherGet(page, limit);
  }
  override teacherIdDelete(id: number, request: Request): void | Promise<void> | Observable<void> {
    return this.teacherService.teacherIdDelete(id, request);
  }
  override teacherIdGet(id: number, request: Request): Teacher | Promise<Teacher> | Observable<Teacher> {
    return this.teacherService.teacherIdGet(id, request);
  }
  override teacherIdPut(id: number, updateTeacherDto: UpdateTeacherDto, request: Request): Teacher | Promise<Teacher> | Observable<Teacher> {
    return this.teacherService.teacherIdPut(id, updateTeacherDto, request);
  }
  override teacherPost(createTeacherDto: CreateTeacherDto, request: Request): Teacher | Promise<Teacher> | Observable<Teacher> {
    return this.teacherService.teacherPost(createTeacherDto, request);
  }
  constructor(private readonly teacherService: TeacherService) {
    super();
  }
}