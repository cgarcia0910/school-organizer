import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubjectApi } from '../api';
import { CreateSubjectDto, PaginatedSubjectResponse, Subject, UpdateSubjectDto,  } from '../models';

@Controller()
export class SubjectApiController {
  constructor(private readonly subjectApi: SubjectApi) {}

  @Get('/subject')
  subjectGet(@Query('page') page: number, @Query('limit') limit: number, @Req() request: Request): PaginatedSubjectResponse | Promise<PaginatedSubjectResponse> | Observable<PaginatedSubjectResponse> {
    return this.subjectApi.subjectGet(page, limit, request);
  }

  @Delete('/subject/:id')
  subjectIdDelete(@Param('id') id: number, @Req() request: Request): void | Promise<void> | Observable<void> {
    return this.subjectApi.subjectIdDelete(id, request);
  }

  @Get('/subject/:id')
  subjectIdGet(@Param('id') id: number, @Req() request: Request): Subject | Promise<Subject> | Observable<Subject> {
    return this.subjectApi.subjectIdGet(id, request);
  }

  @Put('/subject/:id')
  subjectIdPut(@Param('id') id: number, @Body() updateSubjectDto: UpdateSubjectDto, @Req() request: Request): Subject | Promise<Subject> | Observable<Subject> {
    return this.subjectApi.subjectIdPut(id, updateSubjectDto, request);
  }

  @Post('/subject')
  subjectPost(@Body() createSubjectDto: CreateSubjectDto, @Req() request: Request): Subject | Promise<Subject> | Observable<Subject> {
    return this.subjectApi.subjectPost(createSubjectDto, request);
  }

} 