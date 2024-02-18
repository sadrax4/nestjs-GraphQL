import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';
import { GoogleAuthGuard } from 'src/auth/guards/google.auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local.auth.guard';
import { CurrentUser } from 'src/auth/decorator';
import { User } from 'src/auth/constant';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }
    @Post('signin')
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.createUser(createUser);
    }

    @Get('list')
    @UseGuards(LocalAuthGuard)
    async getUsers(@CurrentUser() user: User) {
        return await this.userService.getUser();
    }
}
