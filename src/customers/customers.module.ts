import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]), 
    RedisModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})

export class CustomersModule {}
