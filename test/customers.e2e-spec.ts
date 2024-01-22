import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as pactum from 'pactum'
import { AppModule } from '../src/app.module';
import { CreateCustomerDto } from 'src/customers/dto';
import { getConnection, Connection} from 'typeorm'
import dataSource from '../db/data-source';
import { ConnectionService } from '../src/connection/connection.service';
import { Customer } from '../src/customers/entities/customer.entity';

describe('CustomerController E2E Test', () => {
  let app: INestApplication;

  const mockCustomerDto: CreateCustomerDto = {
    firstName: 'Test',
    lastName: 'TestLa',
    email: 'test@gmail.com',
    password: 'Tester@12345'
  } 

  let dbConnection: Connection;
  let httpServer: any

  beforeAll(async()=>{
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            AppModule
        ],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // await app.listen(3333);

    dbConnection = moduleFixture.get<ConnectionService>(ConnectionService).getDbHandler()
    httpServer = app.getHttpServer()
    const customerRepository = dbConnection.manager.getRepository('Customer');

    // console.log('###PASSED CONNECTIO', customerRepository);
  })

  afterAll(async()=>{
    await dbConnection.manager.getRepository('Customer').delete({email: 'test@gmail.com',})
    await app.close
  })

//   it('/ (POST) customers', async () => {
//     return  request(app.getHttpServer())
//                 .post('/customers')
//                 .send(mockCustomerDto)
//                 .expect(201)
//   });

//   it('/ (GET) customers', async () => {
//     await dbConnection.getRepository('Customer').save(mockCustomerDto)
//     return request(httpServer)
//             .get('/customers')
//             .expect(HttpStatus.OK)
//   });

  it('(POST) /customers', async () => {
    const response = await dbConnection.getRepository('Customer').save(mockCustomerDto)
    expect(response.email)
  })

  it('(GET) /customers', async () => {
    const response = await dbConnection.getRepository('Customer').find()
    expect(typeof response === 'object')
  })

  it('(POST) /auth/login', async () => {
    const response = await request(httpServer)
    .post('/auth/login')
    .send({
        email: mockCustomerDto.email,
        password: mockCustomerDto.password
    })
    .expect(200)
    expect(response.body).toContain('access_token')
  })
});
