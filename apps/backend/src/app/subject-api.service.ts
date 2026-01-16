import { Injectable } from "@nestjs/common";
import { 
  SubjectApi,
  PaginatedSubjectResponse,
  UpdateSubjectDto,
  CreateSubjectDto,
  Subject,
} from "@organizer/generated-server-subject"; 
import { Observable } from "rxjs";
import { SubjectService } from "../services/subject.service";

@Injectable()
export class SubjectApiService extends SubjectApi {
  override subjectGet(page: number, limit: number, request: Request): PaginatedSubjectResponse | Promise<PaginatedSubjectResponse> | Observable<PaginatedSubjectResponse> {
    return this.subjectService.subjectGet(page, limit);
  }
  override subjectIdDelete(id: number, request: Request): void | Promise<void> | Observable<void> {
    return this.subjectService.subjectIdDelete(id, request);
  }
  override subjectIdGet(id: number, request: Request): Subject | Promise<Subject> | Observable<Subject> {
    return this.subjectService.subjectIdGet(id, request);
  }
  override subjectIdPut(id: number, updateSubjectDto: UpdateSubjectDto, request: Request): Subject | Promise<Subject> | Observable<Subject> {
    return this.subjectService.subjectIdPut(id, updateSubjectDto, request);
  }
  override subjectPost(createSubjectDto: CreateSubjectDto, request: Request): Subject | Promise<Subject> | Observable<Subject> {
    return this.subjectService.subjectPost(createSubjectDto, request);
  }
  constructor(private readonly subjectService: SubjectService) {
    super();
  }
}