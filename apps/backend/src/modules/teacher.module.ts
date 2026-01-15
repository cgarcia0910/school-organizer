import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from '../entities/teacher.entity';
import { TeacherService } from '../services/teacher.service';
import { TeacherDataSeederService } from '../services/teacher-data-seeder.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity])],
  providers: [TeacherService, TeacherDataSeederService],
  exports: [TeacherService],
})
export class TeacherModule {}
