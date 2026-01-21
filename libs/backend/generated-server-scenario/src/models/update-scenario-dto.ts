import { CreateScenarioCourse } from './create-scenario-course';


export interface UpdateScenarioDto { 
  name?: string;
  courses?: Array<CreateScenarioCourse>;
}

