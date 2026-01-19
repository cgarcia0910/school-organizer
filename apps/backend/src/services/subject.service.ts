import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubjectEntity } from '../entities/subject.entity';
import { 
  Subject,
  UpdateSubjectDto,
  CreateSubjectDto,
  PaginatedSubjectResponse,
} from '@organizer/generated-server-subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {}

  async subjectGet(page: number, limit: number): Promise<PaginatedSubjectResponse> {
    return this.subjectRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    }).then(([subjects, total]) => {
      return {
        data: subjects.map(this.entityToModel),
        meta: {
          page: page,
          limit: limit,
          total: total,
        },
      }
    });
  }

  subjectIdDelete(id: number, request: Request): Promise<void> {
    return this.subjectRepository.delete(id).then(() => {
      return;
    });
  }

  subjectIdGet(id: number, request: Request): Promise<Subject> {
    return this.subjectRepository.findOne({ where: { id } }).then(subject => {
      return this.entityToModel(subject as SubjectEntity);
    });
  }

  subjectIdsGet(ids: Array<number>, request: Request): Promise<Subject[]> {
    return this.subjectRepository.find({ where: { id: In(ids) } }).then(subjects => {
      return subjects.map(this.entityToModel);
    });
  }

  subjectIdPut(id: number, updateSubjectDto: UpdateSubjectDto, request: Request): Promise<Subject> {
    return this.subjectRepository.update(id, updateSubjectDto).then(() => {
    return this.subjectRepository.findOne({ where: { id } }).then(subject => {
      return this.entityToModel(subject as SubjectEntity);
    });
  });
}

  subjectPost(createSubjectDto: CreateSubjectDto, request: Request): Promise<Subject> {
    return this.subjectRepository.save(createSubjectDto).then(subject => {
      return this.entityToModel(subject as SubjectEntity);
    });
  }


  private entityToModel(entity: SubjectEntity): Subject {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}