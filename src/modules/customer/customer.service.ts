import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto'
import * as bcrypt from 'bcrypt'
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CustomerService {
    constructor(
      @InjectRepository(Customer) private customersRepository : Repository<Customer>,
      private readonly redisService: RedisService
      ) {}
    
    /**
     * List of all customers
     */
    async getCustomers(){
        return this.customersRepository.find()
    }

    /**
     * Create new customer
     */
    async create(createCustomerDto: CreateCustomerDto){
        try {
            const newCustomerDto = {
              ...createCustomerDto,
              password: await bcrypt.hash(createCustomerDto.password, 10),
            };
            
            const newCustomer = this.customersRepository.create(newCustomerDto);

            return await this.customersRepository.save(newCustomer);
          } catch (error) {
            if (error?.code === 'ORA-00001' || error?.message?.includes('unique constraint')) {
              throw new ConflictException('Email address is already in use');
            } else {
              throw error;
            }
          }
    }

    /**
     * Customer Details
     */
    async getOneCustomer(id:string){
        const customer = await this.customersRepository.findOneBy({ id })
        return customer
    }

    /**
     * Get user by email
     */
    async findOneByEmail(email: string): Promise<Customer | undefined> {
        return this.customersRepository.findOneBy({email});
    }
}
