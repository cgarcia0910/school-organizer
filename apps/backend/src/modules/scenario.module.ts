import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenarioEntity } from '../entities/scenario.entity';
import { ScenarioService } from '../services/scenario.service';
import { ScenarioDataSeederService } from '../services/scenario-data-seeder.service';
import { ScenarioCourseEntity } from '../entities/scenario-course.entity';
import { ScenarioCourseGroupEntity } from '../entities/scenario-course-group.entity';
import { ScenarioCourseGroupSubjectTeacherEntity } from '../entities/scenario-course-group-subject-teacher';
import { HttpModule } from '@nestjs/axios';
import { CourseSubjectEntity } from '../entities/course-subject.entity';
import { TimetableEntity } from '../entities/timetable.entity';
import { CourseEntity } from '../entities/course.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScenarioEntity,
      ScenarioCourseEntity,
      ScenarioCourseGroupEntity,
      ScenarioCourseGroupSubjectTeacherEntity,
      CourseSubjectEntity,
      CourseEntity,
      TimetableEntity]),
    HttpModule,
  ],
  providers: [ScenarioService, ScenarioDataSeederService],
  exports: [ScenarioService],
})
export class ScenarioModule {}
