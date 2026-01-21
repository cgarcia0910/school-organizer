import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScenarioEntity } from '../entities/scenario.entity';

@Injectable()
export class ScenarioDataSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(ScenarioEntity)
    private scenarioRepository: Repository<ScenarioEntity>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const userCount = await this.scenarioRepository.count();
    
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

      // for (const userData of users) {
      //   const user = this.scenarioRepository.create(userData);
      //   await this.scenarioRepository.save(user);
      // }

      console.log('✅ Base de datos inicializada con scenario de prueba');
    }
  }
}
