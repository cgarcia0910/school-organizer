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
    console.log(courseSubjects)
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

  async courseIdDelete(id: number, request: Request): Promise<void> {
    // Primero eliminar todas las relaciones course-subject
    await this.courseSubjectService.courseSubjectDeleteByCourseId(id);
    
    // Luego eliminar el curso
    await this.courseRepository.delete(id);
    
    return;
  }

  courseIdGet(id: number, request: Request): Promise<Course> {
    return this.courseRepository.findOne({ where: { id } }).then(course => {
      return this.entityToModel(course as CourseEntity);
    });
  }

  async courseIdPut(id: number, updateCourseDto: UpdateCourseDto, request: Request): Promise<Course> {
    // Actualizar los datos básicos del curso
    await this.courseRepository.update(id, {
      name: updateCourseDto.name
    });
    console.log(updateCourseDto);
    // Si se enviaron subjects, actualizar las relaciones
    if (updateCourseDto.subjectWorkLoads && updateCourseDto.subjectWorkLoads.length > 0) {
      // Eliminar todas las relaciones anteriores
      await this.courseSubjectService.courseSubjectDeleteByCourseId(id);
      
      // Crear las nuevas relaciones
      const subjectWorkLoads = JSON.parse(updateCourseDto.subjectWorkLoads as unknown as string) || [];
      const courseSubjects: CourseSubjectEntity[] = subjectWorkLoads.map((swl: any) => ({ 
        course: { id: id }, 
        subject: { id: swl.subject?.id },
        hoursPerWeek: swl.workload?.hoursPerWeek,
        maxDailyWorkload: swl.workload?.maxDailyWorkload
})) as CourseSubjectEntity[];
      
      await this.courseSubjectService.courseSubjectPost(courseSubjects, request);
    }

    // Obtener y retornar el curso actualizado con sus subjects
    const course = await this.courseRepository.findOne({ where: { id } });
    const courseSubjects = await this.courseSubjectService.courseSubjectGetByCourseIds([id], request);
    const subjects = await this.subjectService.subjectIdsGet(courseSubjects.map(cs => cs.subject.id), request);
    
    return this.entityToModel(course as CourseEntity, courseSubjects, subjects);
  }

  async coursePost(createCourseDto: CreateCourseDto, request: Request): Promise<Course> {
    console.log(createCourseDto)
    const course = await this.courseRepository.save(createCourseDto);
    const subjectWorkLoads = JSON.parse(course.subjectWorkLoads as unknown as string) || [];
    const courseSubjects: CourseSubjectEntity[] = subjectWorkLoads.map((swl: any) => ({ 
      course: { id: course.id }, 
      subject: { id: swl.subject?.id },
      hoursPerWeek: swl.workload?.hoursPerWeek,
      maxDailyWorkload: swl.workload?.maxDailyWorkload
    })) as CourseSubjectEntity[];
    console.log(courseSubjects)
    await this.courseSubjectService.courseSubjectPost(courseSubjects, request);
    return this.entityToModel(course as CourseEntity);
  }


  private entityToModel(entity: CourseEntity, courseSubjects?: CourseSubjectEntity[], subjects?: SubjectEntity[]): Course {
    return {
      id: entity.id,
      name: entity.name,
      subjects: courseSubjects?.map(courseSubject => ({
        subject: courseSubject.subject,
        workload: {
          hoursPerWeek: courseSubject.hoursPerWeek,
          maxDailyWorkload: courseSubject.maxDailyWorkload
        }
      }))
    };
  }
}