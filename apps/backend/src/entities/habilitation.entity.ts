import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { SubjectEntity } from './subject.entity';

@Entity('habilitation')
export class HabilitationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @ManyToOne(() => CourseEntity, (course) => course.id)
  course!: CourseEntity;

  @Column({ type: 'json' })
  subjects!: SubjectEntity[];
}