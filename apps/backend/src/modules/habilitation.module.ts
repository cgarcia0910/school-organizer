import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabilitationEntity } from '../entities/habilitation.entity';
import { HabilitationService } from '../services/habilitation.service';
import { HabilitationDataSeederService } from '../services/habilitation-data-seeder.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([HabilitationEntity])],
  providers: [HabilitationService, HabilitationDataSeederService],
  exports: [HabilitationService],
})
export class HabilitationModule {}
