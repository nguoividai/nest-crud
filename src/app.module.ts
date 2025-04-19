import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or your DB host
      port: 5432,
      username: 'postgres', // your DB username
      password: '123', // your DB password
      database: 'nest_crud', // name of your DB
      entities: [User],
      synchronize: true, // auto-create tables (disable in production)
    }),
    UsersModule,
  ],
})
export class AppModule {}
