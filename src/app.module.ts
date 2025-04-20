import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apis/users/users.module';
import { User } from './apis/users/entities/user.entity';
import { AuthModule } from './apis/auth/auth.module';
import { DatabaseConfig } from './config/database';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      entities: [User],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
