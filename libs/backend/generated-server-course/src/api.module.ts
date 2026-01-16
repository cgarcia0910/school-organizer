import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementations } from './api-implementations'
import { CourseApi } from './api';
import { CourseApiController } from './controllers';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: ApiImplementations): DynamicModule {
      const providers: Provider[] = [
        {
          provide: CourseApi,
          useClass: apiImplementations.courseApi
        },
      ];

      return {
        module: ApiModule,
        controllers: [
          CourseApiController,
        ],
        providers: [...providers],
        exports: [...providers]
      }
    }
}