import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementations } from './api-implementations'
import { ScenarioApi } from './api';
import { ScenarioApiController } from './controllers';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: ApiImplementations): DynamicModule {
      const providers: Provider[] = [
        {
          provide: ScenarioApi,
          useClass: apiImplementations.scenarioApi
        },
      ];

      return {
        module: ApiModule,
        controllers: [
          ScenarioApiController,
        ],
        providers: [...providers],
        exports: [...providers]
      }
    }
}