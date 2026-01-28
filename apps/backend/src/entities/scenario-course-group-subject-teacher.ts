import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherEntity } from './teacher.entity';
import { ScenarioCourseGroupEntity } from './scenario-course-group.entity';
import { SubjectEntity } from './subject.entity';

@Entity('scenario-course-group-subject-teacher')
export class ScenarioCourseGroupSubjectTeacherEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SubjectEntity, (subject) => subject.id)
  subject!: SubjectEntity;

  @ManyToOne(() => ScenarioCourseGroupEntity, (scenarioCourseGroup) => scenarioCourseGroup.id)
  scenarioCourseGroup!: ScenarioCourseGroupEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.id)
  teacher!: TeacherEntity;
}