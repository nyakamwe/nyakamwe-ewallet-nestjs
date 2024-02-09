import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { RedisService } from '../redis/redis.service';

describe('CustomersService', () => {
  let service: CustomerService;

  const mockCustomerRepository = {
    find: jest.fn(),
    create: jest.fn(),
    findOneBy: jest.fn(),
  }

  const  MockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    flushdb: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        RedisService,
        { 
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository
        },
        {
          provide: RedisService, 
          useValue: MockRedisService, 
          
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
