import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JWT_SECRET, SMS_API_KEY, User } from './constant';
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import * as Ghasedak from 'ghasedak';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async validate(
        email: string, password: string
    ): Promise<User | null> {
        const user = await this.userService.findUser(email);
        if (!user) throw new UnauthorizedException();
        const isPasswordValid = await bcrypt.compare(password, user.password)
        return isPasswordValid ? user : null;
    }
    login(
        user: any
    ): { accessToken: string } {
        const payload = {
            email: user.email,
            sub: user.id
        }
        const jwtToken = this.jwtService.sign(payload);
        return {
            accessToken: jwtToken
        }
    }
    async verify(
        jwtToken: string
    ): Promise<User> {
        const decode = this.jwtService.verify<{ email: string, sub: string }>(
            jwtToken,
            { secret: JWT_SECRET }
        );
        const user = await this.userService.findUser(decode.email);
        if (!user) throw new UnauthorizedException();
        return user;
    }
    async handleGoogleAuth(user: any) {
        const { accessToken } = this.login(user);
        return {
            accessToken,
            msg: "authenticate success "
        }
    }
    async authByOtp() {
        const otpSender = new Ghasedak(SMS_API_KEY)
        const smsOption = {
            message: "123456",
            receptor: "09162844007"
        }
        otpSender.send(smsOption);
        return;
    }
}
