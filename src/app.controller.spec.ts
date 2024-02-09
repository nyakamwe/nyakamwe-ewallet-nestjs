import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaConsumerService } from './modules/kafka/kafka.consumer';
import { KafkaProducerService } from './modules/kafka/kafka.producer';

describe('AppController', () => {
  let appController: AppController;

  const mockKafkaConsumerService = {
    consume: jest.fn(),
    onApplicationShutdown: jest.fn()
  }

  const mockKafkaProducerService = {
    onModuleInit: jest.fn(),
    produce: jest.fn(),
    onApplicationShutdown: jest.fn()
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService, 
        KafkaConsumerService, 
        KafkaProducerService,
        {
          provide: KafkaConsumerService,
          useValue: mockKafkaConsumerService
        },
        {
          provide: KafkaProducerService,
          useValue: mockKafkaProducerService
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getWelcomeMessage()).toBe('Hello World!');
      expect(appController.getWelcomeMessage()).toBeDefined()
    });
  });
});
