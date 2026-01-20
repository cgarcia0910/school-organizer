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
          name: 'First Course',
          subjectWorkLoads: [
            {
              subject: {id: 1, name: 'Maths'},
              workload: {hoursPerWeek: 10, maxDailyWorkload: 2},
            },
          ],
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
