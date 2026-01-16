import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { TeacherModule } from "../modules/teacher.module";
import { TeacherApiService } from "./teacher-api.service";
import { ApiModule as TeacherApiModule } from "@organizer/generated-server-teacher";
import { SubjectModule } from "../modules/subject.module";
import { SubjectApiService } from "./subject-api.service";
import { ApiModule as SubjectApiModule } from "@organizer/generated-server-subject";

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
            })
    ],
  providers: [TeacherApiService, SubjectApiService],
})
export class AppModule {}
