import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { ScenarioEntity } from './scenario.entity';

@Entity('scenario-course')
export class ScenarioCourseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ScenarioEntity, (scenario) => scenario.id)
  scenario!: ScenarioEntity;

  @ManyToOne(() => CourseEntity, (course) => course.id, { eager: true })
  course!: CourseEntity;
}