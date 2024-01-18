import { Injectable } from '@nestjs/common';
import { ListCustomersDto } from './dto/list-customers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

// export type Customer = {
//     id: number,
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
// }; 

@Injectable()
export class CustomersService {
    constructor(@InjectRepository(Customer) private customersRepository : Repository<Customer> ) {}
    
    async getCustomers(){
        return this.customersRepository.find()
    }

    async create(createCustomerDto: CreateCustomerDto){
        const newCustomer = this.customersRepository.create(createCustomerDto)
        return this.customersRepository.save(newCustomer)
    }

    async getOneCustomer(id:string){
        const customer = await this.customersRepository.findOneBy({ id })

        if(!customer){
            throw new Error('Customer not found')
        }
        return customer
    }

    async findOneByEmail(email: string): Promise<Customer | undefined> {
        return this.customersRepository.findOneBy({email});
    }
}
