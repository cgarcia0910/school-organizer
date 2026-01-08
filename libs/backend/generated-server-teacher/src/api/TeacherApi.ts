import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTeacherDto, PaginatedTeacherResponse, Teacher, UpdateTeacherDto,  } from '../models';


@Injectable()
export abstract class TeacherApi {

  abstract teacherGet(page: number, limit: number,  request: Request): PaginatedTeacherResponse | Promise<PaginatedTeacherResponse> | Observable<PaginatedTeacherResponse>;


  abstract teacherIdDelete(id: number,  request: Request): void | Promise<void> | Observable<void>;


  abstract teacherIdGet(id: number,  request: Request): Teacher | Promise<Teacher> | Observable<Teacher>;


  abstract teacherIdPut(id: number, updateTeacherDto: UpdateTeacherDto,  request: Request): Teacher | Promise<Teacher> | Observable<Teacher>;


  abstract teacherPost(createTeacherDto: CreateTeacherDto,  request: Request): Teacher | Promise<Teacher> | Observable<Teacher>;

} 