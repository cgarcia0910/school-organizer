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
    }).then(([habilitations, total]) => {
      return {
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
    return this.habilitationRepository.findOne({ where: { id } }).then(habilitation => {
      return this.entityToModel(habilitation as HabilitationEntity);
    });
  }

  habilitationIdPut(id: number, updateHabilitationDto: UpdateHabilitationDto, request: Request): Promise<Habilitation> {
    return this.habilitationRepository.update(id, updateHabilitationDto).then(() => {
    return this.habilitationRepository.findOne({ where: { id } }).then(habilitation => {
      return this.entityToModel(habilitation as HabilitationEntity);
    });
  });
}

  habilitationPost(createHabilitationDto: CreateHabilitationDto, request: Request): Promise<Habilitation> {
    return this.habilitationRepository.save(createHabilitationDto).then(habilitation => {
      return this.entityToModel(habilitation as HabilitationEntity);
    });
  }


  private entityToModel(entity: HabilitationEntity): Habilitation {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}