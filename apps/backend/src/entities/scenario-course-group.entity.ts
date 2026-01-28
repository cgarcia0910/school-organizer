import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScenarioEntity } from './scenario.entity';
import { CourseEntity } from './course.entity';

@Entity('scenario-course-group')
export class ScenarioCourseGroupEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ScenarioEntity, (scenario) => scenario.id)
  scenario!: ScenarioEntity;

  @ManyToOne(() => CourseEntity, (course) => course.id)
  course!: CourseEntity;

  @Column({ type: 'varchar', length: 255 })
  groupName!: string;
}