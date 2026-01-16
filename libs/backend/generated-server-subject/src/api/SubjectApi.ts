import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateSubjectDto, PaginatedSubjectResponse, Subject, UpdateSubjectDto,  } from '../models';


@Injectable()
export abstract class SubjectApi {

  abstract subjectGet(page: number, limit: number,  request: Request): PaginatedSubjectResponse | Promise<PaginatedSubjectResponse> | Observable<PaginatedSubjectResponse>;


  abstract subjectIdDelete(id: number,  request: Request): void | Promise<void> | Observable<void>;


  abstract subjectIdGet(id: number,  request: Request): Subject | Promise<Subject> | Observable<Subject>;


  abstract subjectIdPut(id: number, updateSubjectDto: UpdateSubjectDto,  request: Request): Subject | Promise<Subject> | Observable<Subject>;


  abstract subjectPost(createSubjectDto: CreateSubjectDto,  request: Request): Subject | Promise<Subject> | Observable<Subject>;

} 