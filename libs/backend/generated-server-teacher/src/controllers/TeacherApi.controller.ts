import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TeacherApi } from '../api';
import { CreateTeacherDto, PaginatedTeacherResponse, Teacher, UpdateTeacherDto,  } from '../models';

@Controller()
export class TeacherApiController {
  constructor(private readonly teacherApi: TeacherApi) {}

  @Get('/teacher')
  teacherGet(@Query('page') page: number, @Query('limit') limit: number, @Req() request: Request): PaginatedTeacherResponse | Promise<PaginatedTeacherResponse> | Observable<PaginatedTeacherResponse> {
    return this.teacherApi.teacherGet(page, limit, request);
  }

  @Delete('/teacher/:id')
  teacherIdDelete(@Param('id') id: number, @Req() request: Request): void | Promise<void> | Observable<void> {
    return this.teacherApi.teacherIdDelete(id, request);
  }

  @Get('/teacher/:id')
  teacherIdGet(@Param('id') id: number, @Req() request: Request): Teacher | Promise<Teacher> | Observable<Teacher> {
    return this.teacherApi.teacherIdGet(id, request);
  }

  @Put('/teacher/:id')
  teacherIdPut(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto, @Req() request: Request): Teacher | Promise<Teacher> | Observable<Teacher> {
    return this.teacherApi.teacherIdPut(id, updateTeacherDto, request);
  }

  @Post('/teacher')
  teacherPost(@Body() createTeacherDto: CreateTeacherDto, @Req() request: Request): Teacher | Promise<Teacher> | Observable<Teacher> {
    return this.teacherApi.teacherPost(createTeacherDto, request);
  }

} 