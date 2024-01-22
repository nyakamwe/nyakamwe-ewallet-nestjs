import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as pactum from 'pactum'
import { AppModule } from '../src/app.module';
import { CreateCustomerDto } from 'src/customers/dto';
import { Connection} from 'typeorm'
import { ConnectionService } from '../src/connection/connection.service';
import { CreateWalletDto, TopUpWalletDto } from 'src/wallet/dto';

describe('Tekana wallet E2E Test', () => {
  let app: INestApplication;

  const mockCustomerDto: CreateCustomerDto = {
    firstName: 'Test',
    lastName: 'TestLa',
    email: 'test@gmail.com',
    password: 'Tester@12345'
  } 

  const mockWalletCreateDto: CreateWalletDto = {
    name: 'testWalletName'
  }

  const topUpWalletDto: TopUpWalletDto = {
    amount: 400
  }
  
  let dbConnection: Connection;
  let httpServer: any
  let token: string
  let wallet: any

  beforeAll(async()=>{
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // await app.listen(3333);

    dbConnection = moduleFixture.get<ConnectionService>(ConnectionService).getDbHandler()
    httpServer = app.getHttpServer()
  })

  afterAll(async()=>{
    await dbConnection.manager.getRepository('WalletTransaction').delete({})
    await dbConnection.manager.getRepository('Wallet').delete({name: 'testWalletName',})
    await dbConnection.manager.getRepository('Customer').delete({email: 'test@gmail.com',})
    await app.close
  })

  it('It should create a new customer (POST) /customers', async () => {
    return request(httpServer)
              .post('/customers')
              .send(mockCustomerDto)
              .expect(HttpStatus.CREATED)
  });

  it('It should lists all customers (GET) /customers', async () => {
    return request(httpServer)
            .get('/customers')
            .expect(200)
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
              name: mockWalletCreateDto.name,
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
