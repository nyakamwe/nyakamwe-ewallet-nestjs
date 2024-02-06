import { Wallet } from "./wallet.entity";
import { Customer } from "../../customer/entities/customer.entity"
import { IsEnum, IsNotEmpty } from "class-validator";
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    Double,
    CreateDateColumn 
} from 'typeorm'

import { WalletTransactionTypeEnum, WalletTransactionStatusEnum } from "../enums/wallet-transactions.enum";

@Entity()
export class WalletTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @IsEnum(WalletTransactionStatusEnum)
    @Column()
    status: WalletTransactionStatusEnum

    @IsNotEmpty()
    @IsEnum(WalletTransactionTypeEnum)
    @Column()
    type: WalletTransactionTypeEnum

    @Column({ type: 'double precision' })
    @IsNotEmpty()
    amount: Double;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=> Customer, (customer)=> customer.transactions )
    customer: Customer

    @ManyToOne(()=> Wallet, (wallet)=> wallet.transactions )
    wallet: Wallet
}
