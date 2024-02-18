import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
@ObjectType()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column({ nullable: true })
    phone?: string

    @Column({ nullable: true })
    password?: string

    @Column('simple-array', { nullable: true })
    cars?: string[]

    @Column({nullable:true})
    otp?:string
}