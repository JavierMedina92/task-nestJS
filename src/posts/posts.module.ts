import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { UsersModule } from "src/users/users.module";
import { PostsService } from "./post.service";

@Module({
   imports: [
    TypeOrmModule.forFeature([Post]), UsersModule],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}