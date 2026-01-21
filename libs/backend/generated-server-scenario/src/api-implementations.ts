import { Type } from '@nestjs/common';
import { ScenarioApi } from './api';

/**
 * Provide this type to {@link ApiModule} to provide your API implementations
**/
export type ApiImplementations = {
  scenarioApi: Type<ScenarioApi>
};
