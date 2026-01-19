import { Injectable } from "@nestjs/common";
import { 
  HabilitationApi,
  PaginatedHabilitationResponse,
  UpdateHabilitationDto,
  CreateHabilitationDto,
  Habilitation,
} from "@organizer/generated-server-habilitation"; 
import { Observable } from "rxjs";
import { HabilitationService } from "../services/habilitation.service";

@Injectable()
export class HabilitationApiService extends HabilitationApi {
  override habilitationGet(page: number, limit: number, request: Request): PaginatedHabilitationResponse | Promise<PaginatedHabilitationResponse> | Observable<PaginatedHabilitationResponse> {
    return this.habilitationService.habilitationGet(page, limit);
  }
  override habilitationIdDelete(id: number, request: Request): void | Promise<void> | Observable<void> {
    return this.habilitationService.habilitationIdDelete(id, request);
  }
  override habilitationIdGet(id: number, request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation> {
    return this.habilitationService.habilitationIdGet(id, request);
  }
  override habilitationIdPut(id: number, updateHabilitationDto: UpdateHabilitationDto, request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation> {
    return this.habilitationService.habilitationIdPut(id, updateHabilitationDto, request);
  }
  override habilitationPost(createHabilitationDto: CreateHabilitationDto, request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation> {
    return this.habilitationService.habilitationPost(createHabilitationDto, request);
  }
  constructor(private readonly habilitationService: HabilitationService) {
    super();
  }
}