import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateHabilitationDto, Habilitation, PaginatedHabilitationResponse, UpdateHabilitationDto,  } from '../models';


@Injectable()
export abstract class HabilitationApi {

  abstract habilitationGet(page: number, limit: number,  request: Request): PaginatedHabilitationResponse | Promise<PaginatedHabilitationResponse> | Observable<PaginatedHabilitationResponse>;


  abstract habilitationIdDelete(id: number,  request: Request): void | Promise<void> | Observable<void>;


  abstract habilitationIdGet(id: number,  request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation>;


  abstract habilitationIdPut(id: number, updateHabilitationDto: UpdateHabilitationDto,  request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation>;


  abstract habilitationPost(createHabilitationDto: CreateHabilitationDto,  request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation>;

} 