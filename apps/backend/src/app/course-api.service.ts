import { Injectable } from "@nestjs/common";
import { 
  CourseApi,
  PaginatedCourseResponse,
  UpdateCourseDto,
  CreateCourseDto,
  Course,
} from "@organizer/generated-server-course"; 
import { Observable } from "rxjs";
import { CourseService } from "../services/course.service";

@Injectable()
export class CourseApiService extends CourseApi {
  override courseGet(page: number, limit: number, request: Request): PaginatedCourseResponse | Promise<PaginatedCourseResponse> | Observable<PaginatedCourseResponse> {
    return this.courseService.courseGet(page, limit, request);
  }
  override courseIdDelete(id: number, request: Request): void | Promise<void> | Observable<void> {
    return this.courseService.courseIdDelete(id, request);
  }
  override courseIdGet(id: number, request: Request): Course | Promise<Course> | Observable<Course> {
    return this.courseService.courseIdGet(id, request);
  }
  override courseIdPut(id: number, updateCourseDto: UpdateCourseDto, request: Request): Course | Promise<Course> | Observable<Course> {
    return this.courseService.courseIdPut(id, updateCourseDto, request);
  }
  override coursePost(createCourseDto: CreateCourseDto, request: Request): Course | Promise<Course> | Observable<Course> {
    return this.courseService.coursePost(createCourseDto, request);
  }
  constructor(private readonly courseService: CourseService) {
    super();
  }
}