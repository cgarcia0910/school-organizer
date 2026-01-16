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
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          bio: 'Software developer with 5 years of experience',
          isActive: true,
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+0987654321',
          bio: 'Product manager passionate about user experience',
          isActive: true,
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          bio: 'Designer focused on creating beautiful interfaces',
          isActive: false,
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
