import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User" })
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: String })
    username: string

    @Column({ type: String })
    password: string

    @Column({ type: "simple-array", nullable: true })
    cars?: string[]
}
