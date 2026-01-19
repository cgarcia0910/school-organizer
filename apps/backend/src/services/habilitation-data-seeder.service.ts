import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabilitationEntity } from '../entities/habilitation.entity';

@Injectable()
export class HabilitationDataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(HabilitationEntity)
    private habilitationRepository: Repository<HabilitationEntity>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const userCount = await this.habilitationRepository.count();
    
    if (userCount === 0) {
      const users = [
        {
          name: 'John Doe',
          course: {id: 1},
          subjects: [{id: 1, name: 'Matemáticas'}, {id: 2, name: 'Historia'}, {id: 3, name: 'Ciencias'}],
        },
      ];

      for (const userData of users) {
        const user = this.habilitationRepository.create(userData);
        await this.habilitationRepository.save(user);
      }

      console.log('✅ Base de datos inicializada con habilitation de prueba');
    }
  }
}
