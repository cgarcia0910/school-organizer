import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scenario')
export class ScenarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  status!: string;
}