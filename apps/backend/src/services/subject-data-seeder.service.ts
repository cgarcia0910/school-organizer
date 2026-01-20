import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from '../entities/subject.entity';

@Injectable()
export class SubjectDataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const userCount = await this.subjectRepository.count();
    
    if (userCount === 0) {
      const users = [
        {
          name: 'Maths',
        },
        {
          name: 'Science',
        },
        {
          name: 'Language',
        },
      ];

      for (const userData of users) {
        const user = this.subjectRepository.create(userData);
        await this.subjectRepository.save(user);
      }

      console.log('✅ Base de datos inicializada con subject de prueba');
    }
  }
}
