import { 
    Entity, 
    Double, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn 
} from "typeorm";
import { Customer } from "../../customer/entities/customer.entity";
import { WalletTransaction } from "./wallet-transactions.entity";

@Entity('wallet')
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ type: 'double precision' })
    balance: Double;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=> Customer, (customer)=> customer.wallets )
    customer: Customer;

    @OneToMany(()=> WalletTransaction, (transaction)=> transaction.wallet )
    transactions: WalletTransaction;
}
