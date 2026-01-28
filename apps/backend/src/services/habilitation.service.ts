import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabilitationEntity } from '../entities/habilitation.entity';
import { 
  Habilitation,
  UpdateHabilitationDto,
  CreateHabilitationDto,
  PaginatedHabilitationResponse,
} from '@organizer/generated-server-habilitation';

@Injectable()
export class HabilitationService {
  constructor(
    @InjectRepository(HabilitationEntity)
    private habilitationRepository: Repository<HabilitationEntity>,
  ) {}

  async habilitationGet(page: number, limit: number): Promise<PaginatedHabilitationResponse> {
    return this.habilitationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
      relations: ['course'],
    }).then(([habilitations, total]) => {
      return {
        // data: [],
        data: habilitations.map(this.entityToModel),
        meta: {
          page: page,
          limit: limit,
          total: total,
        },
      }
    });
  }

  habilitationIdDelete(id: number, request: Request): Promise<void> {
    return this.habilitationRepository.delete(id).then(() => {
      return;
    });
  }

  habilitationIdGet(id: number, request: Request): Promise<Habilitation> {
    return this.habilitationRepository.findOne({ 
      where: { id },
      relations: ['course'],
    }).then(habilitation => {
      return this.entityToModel(habilitation as HabilitationEntity);
    });
  }

  habilitationIdPut(id: number, updateHabilitationDto: UpdateHabilitationDto, request: Request): Promise<Habilitation> {
    return this.habilitationRepository.update(id, {
      name: updateHabilitationDto.name,
      course: {id: updateHabilitationDto.course as number},
      subjects: JSON.parse(updateHabilitationDto.subjects as unknown as string),
      // TODO: complete
    }).then(() => {
    return this.habilitationRepository.findOne({ 
      where: { id },
      relations: ['course'],
    }).then(habilitation => {
      return this.entityToModel(habilitation as HabilitationEntity);
    });
  });
}

  habilitationPost(createHabilitationDto: CreateHabilitationDto, request: Request): Promise<Habilitation> {
    console.log({
      name: createHabilitationDto.name,
      course: {id: createHabilitationDto.course},
      subjects: JSON.parse(createHabilitationDto.subjects as unknown as string),
    });
    return this.habilitationRepository.save({
      name: createHabilitationDto.name,
      course: {id: createHabilitationDto.course as number},
      subjects: JSON.parse(createHabilitationDto.subjects as unknown as string),
    }).then(habilitation => {
      return this.entityToModel(habilitation as HabilitationEntity);
    });
  }


  private entityToModel(entity: HabilitationEntity): Habilitation {
    return {
      id: entity.id,
      name: entity.name,
      course: entity.course?.id,
      subjects: (entity.subjects || []).map(subject => ({
        id: subject.id,
        name: subject.name,
      })),
    };
  }
}