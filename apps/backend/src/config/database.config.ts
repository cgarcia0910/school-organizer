import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:', // Base de datos SQLite en memoria
  entities: [],
  synchronize: true, // Solo para desarrollo - cambiar a false en producción
  logging: process.env.NODE_ENV === 'development',
  autoLoadEntities: true,
};
