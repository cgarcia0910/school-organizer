import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HabilitationApi } from '../api';
import { CreateHabilitationDto, Habilitation, PaginatedHabilitationResponse, UpdateHabilitationDto,  } from '../models';

@Controller()
export class HabilitationApiController {
  constructor(private readonly habilitationApi: HabilitationApi) {}

  @Get('/habilitation')
  habilitationGet(@Query('page') page: number, @Query('limit') limit: number, @Req() request: Request): PaginatedHabilitationResponse | Promise<PaginatedHabilitationResponse> | Observable<PaginatedHabilitationResponse> {
    return this.habilitationApi.habilitationGet(page, limit, request);
  }

  @Delete('/habilitation/:id')
  habilitationIdDelete(@Param('id') id: number, @Req() request: Request): void | Promise<void> | Observable<void> {
    return this.habilitationApi.habilitationIdDelete(id, request);
  }

  @Get('/habilitation/:id')
  habilitationIdGet(@Param('id') id: number, @Req() request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation> {
    return this.habilitationApi.habilitationIdGet(id, request);
  }

  @Put('/habilitation/:id')
  habilitationIdPut(@Param('id') id: number, @Body() updateHabilitationDto: UpdateHabilitationDto, @Req() request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation> {
    return this.habilitationApi.habilitationIdPut(id, updateHabilitationDto, request);
  }

  @Post('/habilitation')
  habilitationPost(@Body() createHabilitationDto: CreateHabilitationDto, @Req() request: Request): Habilitation | Promise<Habilitation> | Observable<Habilitation> {
    return this.habilitationApi.habilitationPost(createHabilitationDto, request);
  }

} 