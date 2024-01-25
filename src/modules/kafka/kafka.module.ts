import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka.producer';
import { KafkaConsumerService } from './kafka.consumer';

@Module({
    imports: [],
    providers: [KafkaProducerService, KafkaConsumerService],
    exports: [KafkaProducerService, KafkaConsumerService]
})
export class KafkaModule {}
