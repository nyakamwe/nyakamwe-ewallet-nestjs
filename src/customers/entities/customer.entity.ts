import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { Wallet } from "../../wallet/entities/wallet.entity";

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

    @OneToMany(()=> Wallet, (wallet)=> wallet.customer)
    wallets: Wallet
}   
