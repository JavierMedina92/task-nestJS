import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import { profile } from 'console';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepositoy: Repository <Profile>,
    ) {}

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

    async updateUser(id: number, user: UpdateUserDto) {
       const userFound = await this.userRepository.findOne({
        where: {
            id
        }
       })

       if(!userFound) {
        return new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND);
       }

       const updateUser = Object.assign(userFound, user);
       return this.userRepository.save(updateUser)
    }

    async createProfile(id: number, profile: CreateProfileDto) {
       const userFound = await this.userRepository.findOne({
        where: {
            id,
            },
        });

        if(!userFound) {
            return new HttpException('El Usuario No Existe', HttpStatus.NOT_FOUND);
        }

        const newProfile =  this.profileRepositoy.create(profile);
        const savedProfile = await this.profileRepositoy.save(newProfile)
        userFound.profile = savedProfile

        return this.userRepository.save(userFound)
    }
}
