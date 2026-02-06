import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from '../entities/subject.entity';
import { SubjectService } from '../services/subject.service';
import { SubjectDataSeederService } from '../services/subject-data-seeder.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
