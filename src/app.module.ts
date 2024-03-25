import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tasklist',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }),
  TasksModule,
  UsersModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}