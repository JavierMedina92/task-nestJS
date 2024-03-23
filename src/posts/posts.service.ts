import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from './post.entity';
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { Http2ServerRequest } from "http2";

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private UsersService: UsersService
    ) {}
    
    // title, content, authorId: number
    async createPost(post: CreatePostDto) {
        const userFound = await this.UsersService.getUser(post.authorId)

        if(!userFound) return new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND)

        const newPost = this.postRepository.create(post)
        return this.postRepository.save(newPost)
    }

    getPost() {
        return this.postRepository.find()
    }
}