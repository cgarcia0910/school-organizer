import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ScenarioApi } from '../api';
import { CreateScenarioDto, PaginatedScenarioResponse, Scenario, Timetable, UpdateScenarioDto,  } from '../models';

@Controller()
export class ScenarioApiController {
  constructor(private readonly scenarioApi: ScenarioApi) {}

  @Get('/scenario')
  scenarioGet(@Query('page') page: number, @Query('limit') limit: number, @Req() request: Request): PaginatedScenarioResponse | Promise<PaginatedScenarioResponse> | Observable<PaginatedScenarioResponse> {
    return this.scenarioApi.scenarioGet(page, limit, request);
  }

  @Delete('/scenario/:id')
  scenarioIdDelete(@Param('id') id: number, @Req() request: Request): void | Promise<void> | Observable<void> {
    return this.scenarioApi.scenarioIdDelete(id, request);
  }

  @Get('/scenario/:id')
  scenarioIdGet(@Param('id') id: number, @Req() request: Request): Scenario | Promise<Scenario> | Observable<Scenario> {
    return this.scenarioApi.scenarioIdGet(id, request);
  }

  @Put('/scenario/:id')
  scenarioIdPut(@Param('id') id: number, @Body() updateScenarioDto: UpdateScenarioDto, @Req() request: Request): Scenario | Promise<Scenario> | Observable<Scenario> {
    return this.scenarioApi.scenarioIdPut(id, updateScenarioDto, request);
  }

  @Get('/scenario/:id/timetable')
  scenarioIdTimetableGet(@Param('id') id: number, @Req() request: Request): Timetable | Promise<Timetable> | Observable<Timetable> {
    return this.scenarioApi.scenarioIdTimetableGet(id, request);
  }

  @Post('/scenario')
  scenarioPost(@Body() createScenarioDto: CreateScenarioDto, @Req() request: Request): Scenario | Promise<Scenario> | Observable<Scenario> {
    return this.scenarioApi.scenarioPost(createScenarioDto, request);
  }

} 