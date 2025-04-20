import { DataSource } from 'typeorm';
import { DatabaseConfig } from './database';

export const AppDataSource = new DataSource({
  ...DatabaseConfig,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
});
