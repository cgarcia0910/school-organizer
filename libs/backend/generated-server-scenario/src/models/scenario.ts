import { ScenarioCourse } from './scenario-course';


export interface Scenario { 
  id: number;
  name: string;
  courses?: Array<ScenarioCourse>;
}

