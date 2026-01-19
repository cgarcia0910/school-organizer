import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Course, CreateCourseDto, PaginatedCourseResponse, UpdateCourseDto,  } from '../models';


@Injectable()
export abstract class CourseApi {

  abstract courseGet(page: number, limit: number,  request: Request): PaginatedCourseResponse | Promise<PaginatedCourseResponse> | Observable<PaginatedCourseResponse>;


  abstract courseIdDelete(id: number,  request: Request): void | Promise<void> | Observable<void>;


  abstract courseIdGet(id: number,  request: Request): Course | Promise<Course> | Observable<Course>;


  abstract courseIdPut(id: number, updateCourseDto: UpdateCourseDto,  request: Request): Course | Promise<Course> | Observable<Course>;


  abstract coursePost(createCourseDto: CreateCourseDto,  request: Request): Course | Promise<Course> | Observable<Course>;

} 