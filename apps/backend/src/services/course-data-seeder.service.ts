import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { CourseService } from './course.service';
import { CreateCourseDto } from '@organizer/generated-server-course';

@Injectable()
export class CourseDataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @Inject(CourseService)
    private courseService: CourseService,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const userCount = await this.courseRepository.count();
    
    if (userCount === 0) {
      const users = [
        {
          name: '1',
          subjectWorkLoads: [
            {
              subject: {id: 1, name: 'Lengua'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 2, name: 'Matemáticas'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 3, name: 'Religión'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 4, name: 'Educación Física'},
              workload: {hoursPerWeek: 3, maxDailyWorkload: 1},
            },
            {
              subject: {id: 5, name: 'Inglés'},
              workload: {hoursPerWeek: 5, maxDailyWorkload: 1},
            },
            {
              subject: {id: 6, name: 'Ciencias Sociales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 7, name: 'Ciencias Naturales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 8, name: 'Arte'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 2},
            },
            {
              subject: {id: 9, name: 'Música'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
            {
              subject: {id: 10, name: 'Robotica'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
          ],
        },
        {
          name: '2',
          subjectWorkLoads: [
            {
              subject: {id: 1, name: 'Lengua'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 2, name: 'Matemáticas'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 3, name: 'Religión'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 4, name: 'Educación Física'},
              workload: {hoursPerWeek: 3, maxDailyWorkload: 1},
            },
            {
              subject: {id: 5, name: 'Inglés'},
              workload: {hoursPerWeek: 5, maxDailyWorkload: 1},
            },
            {
              subject: {id: 6, name: 'Ciencias Sociales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 7, name: 'Ciencias Naturales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 8, name: 'Arte'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 2},
            },
            {
              subject: {id: 9, name: 'Música'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
            {
              subject: {id: 10, name: 'Robotica'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
          ],
        },
        {
          name: '3',
          subjectWorkLoads: [
            {
              subject: {id: 1, name: 'Lengua'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 2, name: 'Matemáticas'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 3, name: 'Religión'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 4, name: 'Educación Física'},
              workload: {hoursPerWeek: 3, maxDailyWorkload: 1},
            },
            {
              subject: {id: 5, name: 'Inglés'},
              workload: {hoursPerWeek: 5, maxDailyWorkload: 1},
            },
            {
              subject: {id: 6, name: 'Ciencias Sociales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 7, name: 'Ciencias Naturales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 8, name: 'Arte'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 2},
            },
            {
              subject: {id: 9, name: 'Música'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
            {
              subject: {id: 10, name: 'Robotica'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
          ],
        },
        {
          name: '4',
          subjectWorkLoads: [
            {
              subject: {id: 1, name: 'Lengua'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 2, name: 'Matemáticas'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 3, name: 'Religión'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 4, name: 'Educación Física'},
              workload: {hoursPerWeek: 3, maxDailyWorkload: 1},
            },
            {
              subject: {id: 5, name: 'Inglés'},
              workload: {hoursPerWeek: 5, maxDailyWorkload: 1},
            },
            {
              subject: {id: 6, name: 'Ciencias Sociales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 7, name: 'Ciencias Naturales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 8, name: 'Arte'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 2},
            },
            {
              subject: {id: 9, name: 'Música'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
            {
              subject: {id: 10, name: 'Robotica'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
          ],
        },
        {
          name: '5',
          subjectWorkLoads: [
            {
              subject: {id: 1, name: 'Lengua'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 2, name: 'Matemáticas'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 3, name: 'Religión'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 4, name: 'Educación Física'},
              workload: {hoursPerWeek: 3, maxDailyWorkload: 1},
            },
            {
              subject: {id: 5, name: 'Inglés'},
              workload: {hoursPerWeek: 5, maxDailyWorkload: 1},
            },
            {
              subject: {id: 6, name: 'Ciencias Sociales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 7, name: 'Ciencias Naturales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 8, name: 'Arte'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 2},
            },
            {
              subject: {id: 9, name: 'Música'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
            {
              subject: {id: 10, name: 'Robotica'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
          ],
        },
        {
          name: '6',
          subjectWorkLoads: [
            {
              subject: {id: 1, name: 'Lengua'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 2, name: 'Matemáticas'},
              workload: {hoursPerWeek: 6, maxDailyWorkload: 2},
            },
            {
              subject: {id: 3, name: 'Religión'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 4, name: 'Educación Física'},
              workload: {hoursPerWeek: 3, maxDailyWorkload: 1},
            },
            {
              subject: {id: 5, name: 'Inglés'},
              workload: {hoursPerWeek: 5, maxDailyWorkload: 1},
            },
            {
              subject: {id: 6, name: 'Ciencias Sociales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 7, name: 'Ciencias Naturales'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 1},
            },
            {
              subject: {id: 8, name: 'Arte'},
              workload: {hoursPerWeek: 2, maxDailyWorkload: 2},
            },
            {
              subject: {id: 9, name: 'Música'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
            {
              subject: {id: 10, name: 'Robotica'},
              workload: {hoursPerWeek: 1, maxDailyWorkload: 1},
            },
          ],
        },
      ];

      for (const userData of users) {
        // const user = this.courseRepository.create(userData);
        // await this.courseRepository.save(user);
        await this.courseService.coursePost(userData as CreateCourseDto);
      }

      console.log('✅ Base de datos inicializada con course de prueba');
    }
    }
  }
