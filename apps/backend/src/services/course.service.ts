import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { 
  Course,
  UpdateCourseDto,
  CreateCourseDto,
  PaginatedCourseResponse,
} from '@organizer/generated-server-course';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async courseGet(page: number, limit: number): Promise<PaginatedCourseResponse> {
    return this.courseRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    }).then(([courses, total]) => {
      return {
        data: courses.map(this.entityToModel),
        meta: {
          page: page,
          limit: limit,
          total: total,
        },
      }
    });
  }

  courseIdDelete(id: number, request: Request): Promise<void> {
    return this.courseRepository.delete(id).then(() => {
      return;
    });
  }

  courseIdGet(id: number, request: Request): Promise<Course> {
    return this.courseRepository.findOne({ where: { id } }).then(course => {
      return this.entityToModel(course as CourseEntity);
    });
  }

  courseIdPut(id: number, updateCourseDto: UpdateCourseDto, request: Request): Promise<Course> {
    return this.courseRepository.update(id, updateCourseDto).then(() => {
    return this.courseRepository.findOne({ where: { id } }).then(course => {
      return this.entityToModel(course as CourseEntity);
    });
  });
}

  coursePost(createCourseDto: CreateCourseDto, request: Request): Promise<Course> {
    return this.courseRepository.save(createCourseDto).then(course => {
      return this.entityToModel(course as CourseEntity);
    });
  }


  private entityToModel(entity: CourseEntity): Course {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}