import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Post } from "./post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";


