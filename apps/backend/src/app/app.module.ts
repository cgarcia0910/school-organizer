import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { TeacherModule } from "../modules/teacher.module";
import { TeacherApiService } from "./teacher-api.service";
import { ApiModule as TeacherApiModule } from "@organizer/generated-server-teacher";
import { SubjectModule } from "../modules/subject.module";
import { SubjectApiService } from "./subject-api.service";
import { ApiModule as SubjectApiModule } from "@organizer/generated-server-subject";
import { CourseModule } from "../modules/course.module";
import { CourseApiService } from "./course-api.service";
import { ApiModule as CourseApiModule } from "@organizer/generated-server-course";
import { HabilitationModule } from "../modules/habilitation.module";
import { HabilitationApiService } from "./habilitation-api.service";
import { ApiModule as HabilitationApiModule } from "@organizer/generated-server-habilitation";
import { ScenarioModule } from "../modules/scenario.module";
import { ScenarioApiService } from "./scenario-api.service";
import { ApiModule as ScenarioApiModule } from "@organizer/generated-server-scenario";

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
        TeacherModule,
        TeacherApiModule.forRoot({
              teacherApi: TeacherApiService,
            }),
        SubjectModule,
        SubjectApiModule.forRoot({
              subjectApi: SubjectApiService,
            }),
        CourseModule,
        CourseApiModule.forRoot({
              courseApi: CourseApiService,
            }),
        HabilitationModule,
        HabilitationApiModule.forRoot({
              habilitationApi: HabilitationApiService,
            }),
        ScenarioModule,
        ScenarioApiModule.forRoot({
              scenarioApi: ScenarioApiService,
            })
    ],
  providers: [TeacherApiService, SubjectApiService, CourseApiService, HabilitationApiService, ScenarioApiService],
})
export class AppModule {}
