import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateCustomerRequestDto } from '../src/modules/customer/dto';
import { Connection} from 'typeorm'
import { ConnectionService } from '../src/connection/connection.service';
import { CreateWalletRequestDto, TopUpWalletDto } from '../src/modules/wallet/dto';
import { KafkaConsumerService } from '../src/modules/kafka/kafka.consumer';
import { KafkaProducerService } from '../src/modules/kafka/kafka.producer';
import { _401, _200, _201, _400 } from '../src/shared/constants';
import { RedisService } from '../src/modules/redis/redis.service';
import { Customer } from 'src/modules/customer/entities/customer.entity';

describe('Tekana wallet E2E Test', () => {
  let app: INestApplication;

  let cachingService: RedisService;

  let registeredCustomer: Customer

  const mockCustomerDto: CreateCustomerRequestDto = {
    firstName: 'Test',
    lastName: 'TestLa',
    email: 'test@gmail.com',
    password: 'Tester@12345'
  } 

  const walletCreateDto: CreateWalletRequestDto = {
    name: 'testWalletName'
  }

  const topUpWalletDto: TopUpWalletDto = {
    amount: 400
  }
  
  let dbConnection: Connection;
  let httpServer: any
  let token: string
  let wallet: any

  // Mock Kafka services
  const mockKafkaConsumerService = {
    consume: jest.fn(),
    onApplicationShutdown: jest.fn(),
  };

  const mockKafkaProducerService = {
    produce: jest.fn(),
    onModuleInit: jest.fn(),
    onApplicationShutdown: jest.fn(),
  };

  beforeAll(async()=>{
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    })
    .overrideProvider(KafkaProducerService)
    .useValue(mockKafkaProducerService)
    .overrideProvider(KafkaConsumerService)
    .useValue(mockKafkaConsumerService)
    .compile();

    app = moduleFixture.createNestApplication();
    
    dbConnection = moduleFixture.get<ConnectionService>(ConnectionService).getDbHandler()

    cachingService = moduleFixture.get<RedisService>(RedisService)
    
    httpServer = app.getHttpServer()

    await app.init();
  })

  afterAll(async()=>{
    await dbConnection.manager.getRepository('WalletTransaction').delete({})
    await dbConnection.manager.getRepository('Wallet').delete({name: 'testWalletName',})
    await dbConnection.manager.getRepository('Customer').delete({email: 'test@gmail.com',})

    cachingService.clearAllKeys()

    await app.close()
  })

  it('It should show welcome message and send a message to Kafka and receive it', async () => {
    await request(httpServer)
      .get('/')
      .send({ message: 'Test message' })
      .expect(200);

    // Assert that the mock Kafka producer received the message
    expect(mockKafkaProducerService.produce).toHaveBeenCalledWith({
      topic: 'test',
      messages: [{
        value: 'Kafka Test',
      }],
    });
  });

  it('It should create a new customer (POST) /customers', async () => {
    return request(httpServer)
              .post('/customers')
              .send(mockCustomerDto)
              .expect((res)=> {
                res.statusCode = HttpStatus.CREATED;
                registeredCustomer = res.body
              })
  });

  it('It should lists all customers (GET) /customers  and check if Registered Customer is Cached', async () => {
    await request(httpServer)
            .get('/customers')
            .expect(200)

    const cachedCustomersData = JSON.parse(await cachingService.get('all-customers'))

    expect(cachedCustomersData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...registeredCustomer
        }),
      ]),
    );
  })

  it('It should not create a customer when email already used  (POST) /customers', async () => {
    return request(httpServer)
            .post('/customers')
            .send(mockCustomerDto)
            .expect(HttpStatus.CONFLICT)
  });

  it('It should signin a customer (POST) /auth/login', async ()=>{
    return request(httpServer)
            .post('/auth/login')
            .send({
              email: mockCustomerDto.email,
              password: mockCustomerDto.password
            })
            .expect(HttpStatus.OK)
            .then((response)=> {
              token = response.body['access_token']
            })
  })
  
  it('It should not signin a customer with invalid credentials (POST) /auth/login', async ()=>{
    return request(httpServer)
            .post('/auth/login')
            .send({
              email: "invalid@inv.com",
              password: "blahblah@12345"
            })
            .expect(HttpStatus.UNAUTHORIZED)
  })

  it('It should not create wallet for anonymous customer (POST) /wallet', async ()=>{
    return request(httpServer)
            .post('/wallet')
            .send({
              name: walletCreateDto.name,
            })
            .expect(HttpStatus.UNAUTHORIZED)
  })

  it('It should create wallet for an authorized customer (POST) /wallet', async ()=>{
    return request(httpServer)
            .post('/wallet')
            .send({
              name: 'testWalletName',
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(HttpStatus.CREATED)
            .then((response)=> 
              wallet = response.body
            )
  })

  it('It should lists customer wallets (GET) /wallet', async ()=>{
    return request(httpServer)
            .get('/wallet')
            .set('Authorization', `Bearer ${token}`)
            .expect(HttpStatus.OK)
  })

  it('It should get customer wallet details (GET) /wallet/{walletId}', async ()=>{
    return request(httpServer)
            .get(`/wallet/${wallet.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(HttpStatus.OK)
  })

  it('It should allow customer to topup wallet balance (PATCH) /wallet/{walletId}/topup', async ()=>{
    return request(httpServer)
            .patch(`/wallet/${wallet.id}/topup`)
            .send({
              amount: topUpWalletDto.amount
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(HttpStatus.OK)
  })

  it('It should retrieve wallet transactions (GET) /wallet/{walletId}/transactions', async ()=>{
    return request(httpServer)
            .get(`/wallet/${wallet.id}/transactions`)
            .set('Authorization', `Bearer ${token}`)
            .expect(HttpStatus.OK)
  })
});
