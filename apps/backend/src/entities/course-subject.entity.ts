import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { SubjectEntity } from './subject.entity';

@Entity('course-subject')
export class CourseSubjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => CourseEntity, (course) => course.id)
  course!: CourseEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.id)
  subject!: SubjectEntity;
}