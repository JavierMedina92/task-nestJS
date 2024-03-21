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
                id,
            },
        });

        if (!userFound) {
            return new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND)
        }

        return userFound;
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete({ id });

        if(result.affected === 0) {
            return new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND);
        }

        return
    }

    updateUser(id: number, user: UpdateUserDto) {
       return this.userRepository.update({id}, user)
    }
}
