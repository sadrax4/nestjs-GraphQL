import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsEmpty, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator"
import { Entity } from "typeorm";

@InputType()
export class CreateCarDto {


    @Field(type => String)
    @IsString()
    @IsNotEmpty()
    maker: string;

    @Field(type => String)
    @IsString()
    @IsNotEmpty()
    model: string;

    @Field(type => Int)
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Field(type => String, { nullable: true })
    @IsString()
    @ValidateIf((object, value) => value !== null)
    type?: "SUV" | "coupe" | "sedan" | "etc";

    @Field(type => String, { nullable: true })
    @ValidateIf((object, value) => value !== null)
    description?: string;

    @Field(type => String, { nullable: true })
    owner: string;
}
@InputType()
export class UpdateCarDto {
    @Field(type => String)
    id?: string;

    @Field(type => String, { nullable: true })
    @IsString()
    maker?: string;

    @Field(type => String, { nullable: true })
    @IsString()
    model?: string;

    @Field(type => Int, { nullable: true })
    price?: number;

    @Field(type => String, { nullable: true })
    @ValidateIf((object, value) => value !== null)
    type?: "SUV" | "coupe" | "sedan" | "etc";

    @Field(type => String, { nullable: true })
    @ValidateIf((object, value) => value !== null)
    description?: string;

    @Field(type => String, { nullable: true })
    owner: string;
}

@InputType()
export class FindCarDto {
    @Field(type => Number)
    @IsNumber()
    @IsNotEmpty()
    id: number;
}

@Entity({ name: "message" })
@ObjectType()
export class message {
    @Field(type => Object)
    msg: string
}
