import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CourseApi } from '../api';
import { Course, CreateCourseDto, PaginatedCourseResponse, UpdateCourseDto,  } from '../models';

@Controller()
export class CourseApiController {
  constructor(private readonly courseApi: CourseApi) {}

  @Get('/course')
  courseGet(@Query('page') page: number, @Query('limit') limit: number, @Req() request: Request): PaginatedCourseResponse | Promise<PaginatedCourseResponse> | Observable<PaginatedCourseResponse> {
    return this.courseApi.courseGet(page, limit, request);
  }

  @Delete('/course/:id')
  courseIdDelete(@Param('id') id: number, @Req() request: Request): void | Promise<void> | Observable<void> {
    return this.courseApi.courseIdDelete(id, request);
  }

  @Get('/course/:id')
  courseIdGet(@Param('id') id: number, @Req() request: Request): Course | Promise<Course> | Observable<Course> {
    return this.courseApi.courseIdGet(id, request);
  }

  @Put('/course/:id')
  courseIdPut(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto, @Req() request: Request): Course | Promise<Course> | Observable<Course> {
    return this.courseApi.courseIdPut(id, updateCourseDto, request);
  }

  @Post('/course')
  coursePost(@Body() createCourseDto: CreateCourseDto, @Req() request: Request): Course | Promise<Course> | Observable<Course> {
    return this.courseApi.coursePost(createCourseDto, request);
  }

} 