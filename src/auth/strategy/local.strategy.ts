import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "../constant";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({ usernameField: 'email' })
    }
    async validate(email: string, password: string): Promise<User> {
        const user = await this.authService.validate(email, password);
        return user;
    }
}