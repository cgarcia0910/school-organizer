import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherEntity } from '../entities/teacher.entity';
import { 
  Teacher,
  UpdateTeacherDto,
  CreateTeacherDto,
  PaginatedTeacherResponse,
} from '@organizer/generated-server-teacher';
import { HabilitationEntity } from '../entities/habilitation.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async teacherGet(page: number, limit: number): Promise<PaginatedTeacherResponse> {
    return this.teacherRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    }).then(([teachers, total]) => {
      return {
        data: teachers.map(this.entityToModel),
        meta: {
          page: page,
          limit: limit,
          total: total,
        },
      }
    });
  }

  teacherIdDelete(id: number, request: Request): Promise<void> {
    return this.teacherRepository.delete(id).then(() => {
      return;
    });
  }

  teacherIdGet(id: number, request: Request): Promise<Teacher> {
    return this.teacherRepository.findOne({ where: { id } }).then(teacher => {
      return this.entityToModel(teacher as TeacherEntity);
    });
  }

  teacherIdPut(id: number, updateTeacherDto: UpdateTeacherDto, request: Request): Promise<Teacher> {
    return this.teacherRepository.update(id, {
      name: updateTeacherDto.name,
      habilitations: JSON.parse(updateTeacherDto.habilitations as unknown as string),
    }).then(() => {
    return this.teacherRepository.findOne({ where: { id } }).then(teacher => {
      return this.entityToModel(teacher as TeacherEntity);
    });
  });
}

  teacherPost(createTeacherDto: CreateTeacherDto, request: Request): Promise<Teacher> {
    return this.teacherRepository.save({
      name: createTeacherDto.name,
      habilitations: createTeacherDto.habilitations as unknown as HabilitationEntity[],
    }).then(teacher => {
      return this.entityToModel(teacher as TeacherEntity);
    });
  }


  private entityToModel(entity: TeacherEntity): Teacher {
    return {
      id: entity.id,
      name: entity.name,
      // habilitations: entity.habilitations.map(habilitation => ({
      //   id: habilitation.id,
      //   name: habilitation.name,
      //   course: habilitation.course?.id,
      //   subjects: habilitation.subjects.map(subject => ({
      //     id: subject.id,
      //     name: subject.name,
      //   })),
      // })),
    };
  }
}