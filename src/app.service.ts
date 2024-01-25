import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from './modules/kafka/kafka.producer';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly kafkaService: KafkaProducerService,
    private readonly httpService: HttpService
    ) {}

  async getWelcomeMessage(): Promise<string> {
    const documentationUrl = "http://localhost:3000/docs"

    await this.kafkaService.produce({
      topic: 'test',
      messages: [{
        value: 'Kafka Test'
      }]
    })

    return `Welcome to tekana e-wallet Backend implementation, checkout documentation here ${documentationUrl}`;
  }

  async getWeatherForecasts() {
    const url = 'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json';
    const notificationApiUrl = process.env.NOTIFICATION_API_URL
    const { data } = await firstValueFrom(this.httpService.post(notificationApiUrl, {

    }));

    // return data;
    return notificationApiUrl;
  }
}
