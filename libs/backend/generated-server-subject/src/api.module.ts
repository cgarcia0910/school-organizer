import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementations } from './api-implementations'
import { SubjectApi } from './api';
import { SubjectApiController } from './controllers';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: ApiImplementations): DynamicModule {
      const providers: Provider[] = [
        {
          provide: SubjectApi,
          useClass: apiImplementations.subjectApi
        },
      ];

      return {
        module: ApiModule,
        controllers: [
          SubjectApiController,
        ],
        providers: [...providers],
        exports: [...providers]
      }
    }
}