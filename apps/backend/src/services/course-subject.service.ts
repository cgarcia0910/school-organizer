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

  courseSubjectPost(course: number, subject: number, request: Request): Promise<void> {
    return this.courseSubjectRepository.save({ course: {id: course}, subject: {id: subject} }).then(() => {
      return;
    });
  }

  courseSubjectGet(course: Array<number>, request: Request): Promise<CourseSubjectEntity[]> {
    return this.courseSubjectRepository.find({ where: { course: {id: In(course)} } }).then(courseSubjects => {
      return courseSubjects;
    });
  }
}