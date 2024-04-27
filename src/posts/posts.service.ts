import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Post } from "./post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";


@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private usersService: UsersService,
    ) {}

    // tittle, conent, authordId: number
    async createPost(post: CreatePostDto) {
        const userFound = await this.usersService.getUser(post.authorId);

        if(!userFound) return new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND);
        
        const newPost = this.postsRepository.create(post);
        return this.postsRepository.save(newPost)
    }

    getPosts() {
       return this.postsRepository.find({
        relations: ['author'],
       })
    }
}