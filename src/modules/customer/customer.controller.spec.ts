import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customer.controller';
import { RedisService } from '../redis/redis.service';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

describe('CustomersController', () => {
  let controller: CustomersController;
  let caching: RedisService

  const  MockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    flushdb: jest.fn()
  }

  const mockCustomerRepository = {
    find: jest.fn(),
    create: jest.fn(),
    findOneBy: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomerService, 
        RedisService,
        {
          provide: RedisService, 
          useValue: MockRedisService, 
          
        },
        { 
          provide: getRepositoryToken(Customer), 
          useValue: mockCustomerRepository
        }
      ],
      
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    caching = module.get<RedisService>(RedisService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(caching).toBeDefined()
  });
});
