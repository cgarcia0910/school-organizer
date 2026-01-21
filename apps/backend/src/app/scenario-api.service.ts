import { Injectable } from "@nestjs/common";
import { 
  ScenarioApi,
  PaginatedScenarioResponse,
  UpdateScenarioDto,
  CreateScenarioDto,
  Scenario,
} from "@organizer/generated-server-scenario"; 
import { Observable } from "rxjs";
import { ScenarioService } from "../services/scenario.service";

@Injectable()
export class ScenarioApiService extends ScenarioApi {
  override scenarioGet(page: number, limit: number, request: Request): PaginatedScenarioResponse | Promise<PaginatedScenarioResponse> | Observable<PaginatedScenarioResponse> {
    return this.scenarioService.scenarioGet(page, limit);
  }
  override scenarioIdDelete(id: number, request: Request): void | Promise<void> | Observable<void> {
    return this.scenarioService.scenarioIdDelete(id, request);
  }
  override scenarioIdGet(id: number, request: Request): Scenario | Promise<Scenario> | Observable<Scenario> {
    return this.scenarioService.scenarioIdGet(id, request);
  }
  override scenarioIdPut(id: number, updateScenarioDto: UpdateScenarioDto, request: Request): Scenario | Promise<Scenario> | Observable<Scenario> {
    return this.scenarioService.scenarioIdPut(id, updateScenarioDto, request);
  }
  override scenarioPost(createScenarioDto: CreateScenarioDto, request: Request): Scenario | Promise<Scenario> | Observable<Scenario> {
    return this.scenarioService.scenarioPost(createScenarioDto, request);
  }
  constructor(private readonly scenarioService: ScenarioService) {
    super();
  }
}