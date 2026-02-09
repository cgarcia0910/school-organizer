import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { CourseDataSeederService } from '../services/course-data-seeder.service';
import { CourseSubjectEntity } from '../entities/course-subject.entity';
import { CourseSubjectService } from '../services/course-subject.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CourseSubjectEntity])],
  providers: [CourseService, CourseSubjectService, CourseDataSeederService],
  exports: [CourseService],
})
export class CourseModule {}
