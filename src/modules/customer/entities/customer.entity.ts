import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany, 
    CreateDateColumn,
    Index
} from "typeorm";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { WalletTransaction } from "../../wallet/entities/wallet-transactions.entity";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    @Index()
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
