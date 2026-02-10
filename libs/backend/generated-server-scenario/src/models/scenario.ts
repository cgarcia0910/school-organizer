import { ScenarioCourse } from './scenario-course';


export interface Scenario { 
  id: number;
  name: string;
  courses?: Array<ScenarioCourse>;
  status?: Scenario.StatusEnum;
}
export namespace Scenario {
  export const StatusEnum = {
    SolutionPending: 'SOLUTION_PENDING',
    SolutionReady: 'SOLUTION_READY',
    Published: 'PUBLISHED'
  } as const;
  export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];
}


