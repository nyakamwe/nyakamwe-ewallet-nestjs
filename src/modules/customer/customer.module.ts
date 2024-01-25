import { Module } from '@nestjs/common';
import { CustomersController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]), 
    RedisModule
  ],
  controllers: [CustomersController],
  providers: [CustomerService],
  exports: [CustomerService]
})

export class CustomerModule {}
