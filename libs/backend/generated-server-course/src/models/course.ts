export interface Course { 
  id: number;
  name: string;
  subjects?: Array<{id: number, name: string}>;
}

