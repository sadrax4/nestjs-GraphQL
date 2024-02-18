import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local"
import { UserService } from '../../user/user.service';
import { JWT_SECRET, User } from "../constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpires: false,
            secretOrKey: JWT_SECRET
        })
    }
    async validate(
        validationPayload: { email: string, sub: string }
    ): Promise<User> {
        return await this.userService.findUser(validationPayload.email);
    }
}