import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "CarEntity" })
@ObjectType()
export class CarEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => String)
    id: string;

    @Column({ type: String })
    @Field(type => String,
        { description: "the name of company" })
    maker: string;

    @Column({ type: String })
    @Field(
        type => String,
        { description: "the name of car model" }
    )
    model: string;

    @Column({ type: Number })
    @Field(
        type => Number,
        { description: "the price of car" }
    )
    price: number;

    @Column(
        { type: String, nullable: true }
    )
    @Field(
        type => String,
        {
            nullable: true,
            description: "type of car like 'SUV','coupe','sedan',''etc "
        }
    )
    type?: "SUV" | "coupe" | "sedan" | "etc";

    @Column({ type: String, nullable: true })
    @Field(
        type => String,
        { nullable: true }
    )
    description?: string;

    // @Column({ type: String})
    // @Field(type => String)
    // owner: string;
}