import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string

}   