import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany, 
    CreateDateColumn 
} from "typeorm";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { WalletTransaction } from "src/wallet/entities/wallet-transactions.entity";

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

    @CreateDateColumn({})
    createdAt: Date;

    @OneToMany(()=> Wallet, (wallet)=> wallet.customer)
    wallets: Wallet

    @OneToMany(()=> WalletTransaction, (walletTransaction)=> walletTransaction.customer)
    transactions: WalletTransaction
}   
