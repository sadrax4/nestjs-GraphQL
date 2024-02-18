import { Controller, Get, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { GoogleAuthGuard } from './guards/google.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    auth() {
        return
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleCallback(@Req() req: Request) {
        return this.authService.handleGoogleAuth(req.user);
    }


    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req: Request) {
        console.log(req);
        return this.authService.login(req.user)
    }

    @Get("sms")
    otp() {
        return this.authService.authByOtp();
    }
}
