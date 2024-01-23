import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from './kafka/kafka.producer';

@Injectable()
export class AppService {
  // constructor(private readonly kafkaService: KafkaProducerService) {}

  async getWelcomeMessage(): Promise<string> {
    const documentationUrl = "http://localhost:3000/docs"

    // await this.kafkaService.produce({
    //   topic: 'test',
    //   messages: [{
    //     value: 'Kafka Test'
    //   }]
    // })

    return `Welcome to tekana e-wallet Backend implementation, checkout documentation here ${documentationUrl}`;
  }
}
