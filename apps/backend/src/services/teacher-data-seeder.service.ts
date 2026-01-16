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
          habilities: ['Matemáticas', 'Física', 'Química'],
        },
        {
          name: 'Jane Smith',
          habilities: ['Matemáticas', 'Física', 'Química'],
        },
        {
          name: 'Bob Johnson',
          habilities: ['Matemáticas', 'Física'],
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
