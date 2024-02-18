import { IsEmpty, IsString } from "class-validator"

export class CreateUserDto {

    email: string
    phone?: string
    password?: string
    otp?:string

}