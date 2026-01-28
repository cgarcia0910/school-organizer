import { CreateScenarioCourse } from './create-scenario-course';


export interface CreateScenarioDto { 
  name: string;
  courses?: Array<CreateScenarioCourse>;
}

