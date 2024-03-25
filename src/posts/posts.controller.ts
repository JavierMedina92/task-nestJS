import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./post.service";

@Controller('Posts')
export class PostsController {

    constructor(
        private PostsService: PostsService
    ) {}

@Post()
createPost(@Body() post: CreatePostDto) {
    return this.PostsService.createPost(post)
    }

@Get()
createPosts() {
    return this.PostsService.getPosts()
    }
 }