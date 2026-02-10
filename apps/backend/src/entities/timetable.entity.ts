import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { CourseEntity } from './course.entity';
import { TeacherEntity } from './teacher.entity';
@Entity('timetable')
export class TimetableEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  scenario_id!: number;

  @Column({ type: 'integer' })
  course_id!: number;

  @ManyToOne(() => CourseEntity, (course) => course.id)
  course!: CourseEntity;

  @Column({ type: 'integer' })
  group_id!: number;

  @Column({ type: 'integer' })
  day!: number;

  @Column({ type: 'integer' })
  hour!: number;

  // @Column({ type: 'integer' })
  // subject_id!: number;
  @ManyToOne(() => SubjectEntity, (subject) => subject.id)
  subject!: SubjectEntity;


  @Column({ type: 'integer' })
  teacher_id!: number;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.id)
  teacher!: TeacherEntity;
}