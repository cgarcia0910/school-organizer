import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateScenarioDto, PaginatedScenarioResponse, Scenario, Timetable, UpdateScenarioDto,  } from '../models';


@Injectable()
export abstract class ScenarioApi {

  abstract scenarioGet(page: number, limit: number,  request: Request): PaginatedScenarioResponse | Promise<PaginatedScenarioResponse> | Observable<PaginatedScenarioResponse>;


  abstract scenarioIdCalculateGet(id: number,  request: Request): Timetable | Promise<Timetable> | Observable<Timetable>;


  abstract scenarioIdDelete(id: number,  request: Request): void | Promise<void> | Observable<void>;


  abstract scenarioIdGet(id: number,  request: Request): Scenario | Promise<Scenario> | Observable<Scenario>;


  abstract scenarioIdPut(id: number, updateScenarioDto: UpdateScenarioDto,  request: Request): Scenario | Promise<Scenario> | Observable<Scenario>;


  abstract scenarioIdTimetableGet(id: number,  request: Request): Array<Timetable> | Promise<Array<Timetable>> | Observable<Array<Timetable>>;


  abstract scenarioPost(createScenarioDto: CreateScenarioDto,  request: Request): Scenario | Promise<Scenario> | Observable<Scenario>;

} 