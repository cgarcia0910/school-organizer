import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('habilitation')
export class HabilitationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;
}