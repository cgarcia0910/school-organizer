import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';

@Injectable()
export class CourseDataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const userCount = await this.courseRepository.count();
    
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
        const user = this.courseRepository.create(userData);
        await this.courseRepository.save(user);
      }

      console.log('✅ Base de datos inicializada con course de prueba');
    }
  }
}
