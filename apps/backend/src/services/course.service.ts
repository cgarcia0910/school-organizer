import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { 
  Course,
  UpdateCourseDto,
  CreateCourseDto,
  PaginatedCourseResponse,
} from '@organizer/generated-server-course';
import { CourseSubjectEntity } from '../entities/course-subject.entity';
import { SubjectService } from './subject.service';
import { SubjectEntity } from '../entities/subject.entity';
import { CourseSubjectService } from './course-subject.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @Inject(CourseSubjectService)
    private courseSubjectService: CourseSubjectService,
    @Inject(SubjectService)
    private subjectService: SubjectService,
  ) {}

  async courseGet(page: number, limit: number, request: Request): Promise<PaginatedCourseResponse> {
    const [courses, total] = await this.courseRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
    
    const courseIds = courses.map(course => course.id);
    const courseSubjects = await this.courseSubjectService.courseSubjectGetByCourseIds(courseIds, request);
    const subjects = await this.subjectService.subjectIdsGet(courseSubjects.map(cs => cs.subject.id), request);
  
    return {
      data: courses.map(course => this.entityToModel(course, courseSubjects.filter(courseSubject => courseSubject.course.id === course.id), subjects)),
      meta: {
        page: page,
        limit: limit,
        total: total,
      },
    };
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

  async coursePost(createCourseDto: CreateCourseDto, request: Request): Promise<Course> {
    const course = await this.courseRepository.save(createCourseDto);
    const courseSubjects: CourseSubjectEntity[] = JSON.parse(course.subjects as unknown as string)?.map((subject: number) => ({ 
      course: { id: course.id }, 
      subject: { id: subject } 
    })) as CourseSubjectEntity[];
    await this.courseSubjectService.courseSubjectPost(courseSubjects, request);
    return this.entityToModel(course as CourseEntity);
  }


  private entityToModel(entity: CourseEntity, courseSubjects?: CourseSubjectEntity[], subjects?: SubjectEntity[]): Course {
    return {
      id: entity.id,
      name: entity.name,
      subjects: courseSubjects?.map(courseSubject => subjects?.find(subjet => subjet.id === courseSubject.subject.id)) as {id: number, name: string}[],
    };
  }
}