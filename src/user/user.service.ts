import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { User } from 'src/auth/constant';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }
    async createUser(createUserDto: CreateUserDto) {
        const hashPassword = bcrypt.hashSync(createUserDto.password, 2);
        delete createUserDto.password;
        const user = this.userRepository.create(
            { ...createUserDto, password: hashPassword }
        );
        return await this.userRepository.save(user);
    }
    async createUserByEmail(email: string) {
        return this.userRepository.create({ email })
    }
    async updateUser(userId: string, updateUserDto) {
        return await this.userRepository.update(userId, updateUserDto);
    }
    async removeUser(userId: string) {
        return await this.userRepository.delete({ id: userId })
    }
    async getUser() {
        return await this.userRepository.find()
    }
    async findUser(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } })
    }
}
