import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CourseSubjectEntity } from '../entities/course-subject.entity';

@Injectable()
export class CourseSubjectService {
  constructor(
    @InjectRepository(CourseSubjectEntity)
    private courseSubjectRepository: Repository<CourseSubjectEntity>,
  ) {}

  courseSubjectDelete(course: number, subject: number, request: Request): Promise<void> {
    return this.courseSubjectRepository.delete({ course: {id: course}, subject: {id: subject} }).then(() => {
      return;
    });
  }

  courseSubjectPost(courseSubject: Array<CourseSubjectEntity>, request: Request): Promise<Array<CourseSubjectEntity>> {
    return this.courseSubjectRepository.save(courseSubject)
  }

  courseSubjectGetByCourseIds(courseIds: Array<number>, request: Request): Promise<CourseSubjectEntity[]> {
    return this.courseSubjectRepository.find({ where: { course: {id: In(courseIds)} }, relations: ['course', 'subject'] }).then(courseSubjects => {
      return courseSubjects;
    });
  }

  courseSubjectDeleteByCourseId(courseId: number): Promise<void> {
    return this.courseSubjectRepository.delete({ course: { id: courseId } }).then(() => {
      return;
    });
  }
}