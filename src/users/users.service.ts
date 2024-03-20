import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(user: CreateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException('El Usuario Ya Existe', HttpStatus.CONFLICT)
        }


       const newUser = this.userRepository.create(user)
       return this.userRepository.save(newUser)
    }

    getUsers() {
        return this.userRepository.find()
    }

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne ({
            where: {
                id
            },
        });

        if (!userFound) {
            return new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND)
        }
    }

    deleteUser(id: number) {
     return this.userRepository.delete({ id })
    }

    updateUser(id: number, user: UpdateUserDto) {
       return this.userRepository.update({id}, user)
    }
}
