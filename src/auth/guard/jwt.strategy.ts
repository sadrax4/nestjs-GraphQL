import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt ,Strategy} from "passport-jwt";
//import { Strategy } from 'passport-local';
import { ConfigService } from "@nestjs/config";
import { User } from "../entities/auth.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: "JWT_SECRET"
        })
    }
    async validate(payload: { sub: string, username: string }) {
        const { username } = payload;
        const user: User = await this.authService.findOne(username);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}