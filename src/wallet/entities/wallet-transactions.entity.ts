import { Wallet } from "./wallet.entity";
import { Customer } from "../../customers/entities/customer.entity"
import { IsEnum, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double } from 'typeorm'

@Entity()
export class WalletTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsEnum(['pending', 'success', 'failed', 'timedout'])
    @IsNotEmpty()
    status: string

    @Column()
    @IsEnum(['topup', 'pay'])
    @IsNotEmpty()
    type: string

    @Column({ type: 'double precision' })
    @IsNotEmpty()
    amount: Double;

    @ManyToOne(()=> Customer, (customer)=> customer.transactions )
    customer: Customer

    @ManyToOne(()=> Wallet, (wallet)=> wallet.transactions )
    wallet: Wallet
}
