import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HabilitationEntity } from './habilitation.entity';

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'json'})
  habilitations!: Array<HabilitationEntity>;
}