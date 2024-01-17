import { Injectable } from '@nestjs/common';
import { ListCustomersDto } from './dto/list-customers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';

// export type Customer = {
//     id: number,
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
// }; 

@Injectable()
export class CustomersService {
    // constructor(@InjectRepository(Customer) private readonly customerRepository : Repository<Customer> ) {}
    private customers = [
        {
            "id": "1",
            "firstName": "eric",
            "lastName": "mugisha",
            "email": "mugishaeric@mail.com",
            "password": "@password"
          },
          {
            "id": "2",
            "firstName": "kamana",
            "lastName": "sam",
            "email": "sma@mail.com",
            "password": "@password"
          },
          {
            "id": "3",
            "firstName": "link",
            "lastName": "sam",
            "email": "nyakamweaimable@gmail.com",
            "password": "Tester@12345"
          }
    ]
    async getCustomers(): Promise<any>{
        return this.customers
    }

    getOneCustomer(id:string){
        const customer = this.customers.find((customer)=> customer.id === id)
        if(!customer){
            throw new Error('Customer not found')
        }
        return customer
    }

    async findOne(email: string): Promise<Customer | undefined> {
        return this.customers.find((customer) => customer.email === email );
    }
}
