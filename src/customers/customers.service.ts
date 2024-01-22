import { Injectable, ConflictException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class CustomersService {
    constructor(
      @InjectRepository(Customer) private customersRepository : Repository<Customer>,
      // private readonly connection: Connection, 
      ) {}
    
    async getCustomers(){
        return this.customersRepository.find()
    }

    async create(createCustomerDto: CreateCustomerDto){
        try {
            const newCustomerDto = {
              ...createCustomerDto,
              password: await bcrypt.hash(createCustomerDto.password, 10),
            };
            
            const newCustomer = this.customersRepository.create(newCustomerDto);

            return await this.customersRepository.save(newCustomer);
          } catch (error) {
            if (error?.code === '23505' || error?.detail?.includes('already exists')) {
              throw new ConflictException('Email address is already in use');
            } else {
              throw error;
            }
          }
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
