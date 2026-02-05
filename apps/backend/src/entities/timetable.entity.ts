import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectEntity } from './subject.entity';
@Entity('timetable')
export class TimetableEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  scenario_id!: number;

  @Column({ type: 'integer' })
  course_id!: number;

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
}