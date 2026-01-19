import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementations } from './api-implementations'
import { HabilitationApi } from './api';
import { HabilitationApiController } from './controllers';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: ApiImplementations): DynamicModule {
      const providers: Provider[] = [
        {
          provide: HabilitationApi,
          useClass: apiImplementations.habilitationApi
        },
      ];

      return {
        module: ApiModule,
        controllers: [
          HabilitationApiController,
        ],
        providers: [...providers],
        exports: [...providers]
      }
    }
}