import { Entity, Double, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { Customer } from "../../customers/entities/customer.entity";

@Entity('wallet')
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'double precision' })
    balance: Double;

    @ManyToOne(()=> Customer, (customer)=> customer.wallets )
    customer: Customer;
}
