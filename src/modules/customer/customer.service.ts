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
        const singleKey = await this.redisService.get('single-key')
        if(!customer){
            throw new Error('Customer not found')
        }

        if (singleKey){
            return singleKey
        }

        await this.redisService.set('single-key', customer)

        return customer
    }

    async findOneByEmail(email: string): Promise<Customer | undefined> {
        return this.customersRepository.findOneBy({email});
    }
}
