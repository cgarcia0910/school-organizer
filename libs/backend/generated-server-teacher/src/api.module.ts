import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementations } from './api-implementations'
import { TeacherApi } from './api';
import { TeacherApiController } from './controllers';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: ApiImplementations): DynamicModule {
      const providers: Provider[] = [
        {
          provide: TeacherApi,
          useClass: apiImplementations.teacherApi
        },
      ];

      return {
        module: ApiModule,
        controllers: [
          TeacherApiController,
        ],
        providers: [...providers],
        exports: [...providers]
      }
    }
}