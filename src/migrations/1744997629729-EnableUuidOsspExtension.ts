// src/migrations/EnableUuidOsspExtension.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableUuidOsspExtension1744997629729
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
