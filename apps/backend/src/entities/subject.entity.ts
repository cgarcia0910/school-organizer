import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subject')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;
}