import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'json'})
  habilities!: Array<string>;
}