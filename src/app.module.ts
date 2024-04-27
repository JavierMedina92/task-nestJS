import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { PostsModule } from './posts/posts.module';

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
  UsersModule,
  PostsModule
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}