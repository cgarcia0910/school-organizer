import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { TeacherModule } from "../modules/teacher.module";
import { TeacherApiService } from "./teacher-api.service";
import { ApiModule as TeacherApiModule } from "@organizer/generated-server-teacher";

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
        TeacherModule,
        TeacherApiModule.forRoot({
              teacherApi: TeacherApiService,
            })
    ],
  providers: [TeacherApiService],
})
export class AppModule {}
