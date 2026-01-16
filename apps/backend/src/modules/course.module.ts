import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { CourseDataSeederService } from '../services/course-data-seeder.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  providers: [CourseService, CourseDataSeederService],
  exports: [CourseService],
})
export class CourseModule {}
