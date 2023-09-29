import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninDto, LoginDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }
  singin(signinDto: SigninDto) {
    const user = this.userRepository.create(signinDto)
    return this.userRepository.save(user);
  }
  async login(loginDto: LoginDto) {
    const username = loginDto.username;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user.password !== loginDto.password) throw new ForbiddenException("password not match");
    const payload = { sub: user.id, username, expiration: "1d" }
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: "1h"
    });
    return token;
  }
  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }, select: { id: true, username: true, cars: true }
    });
    return user;
  }
}
