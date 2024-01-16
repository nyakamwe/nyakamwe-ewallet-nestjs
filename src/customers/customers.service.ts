import { Injectable } from '@nestjs/common';
import { ListCustomersDto } from './dto/list-customers.dto';

export type Customer = {
    id: number,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}; 

@Injectable()
export class CustomersService {
    private readonly customers = [
        { id: 1, firstName: "eric", lastName: "mugisha", email: "mugishaeric@mail.com", password: "@password"},
        { id: 2, firstName: "kamana", lastName: "sam", email: "sma@mail.com", password: "@password"},
        { id: 3, firstName: "link", lastName: "sam", email: "nyakamweaimable@gmail.com", password: "Tester@12345"},
    ]

    getCustomers(){
        return this.customers
    }

    getOneCustomer(id:number){
        const customer = this.customers.find((customer)=> customer.id == id)
        console.log('Found', typeof customer.id, typeof id)
        if(!customer){
            throw new Error('Customer not found')
        }
        return customer
    }

    async findOne(email: string): Promise<Customer | undefined> {
        return this.customers.find(customer => customer.email === email);
    }
}
