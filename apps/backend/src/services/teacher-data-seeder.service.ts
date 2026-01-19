import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherEntity } from '../entities/teacher.entity';

@Injectable()
export class TeacherDataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const userCount = await this.teacherRepository.count();
    
    if (userCount === 0) {
      const users = [
        {
          name: 'John Doe',
          habilitations: [{
            id: 1,
            name: 'Matemáticas',
            course: {id: 1},
            subjects: [{id: 1, name: 'Matemáticas'}, {id: 2, name: 'Historia'}]
          }],
        },
      ];

      for (const userData of users) {
        const user = this.teacherRepository.create(userData);
        await this.teacherRepository.save(user);
      }

      console.log('✅ Base de datos inicializada con teacher de prueba');
    }
  }
}
