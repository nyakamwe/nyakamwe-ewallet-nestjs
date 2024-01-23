import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaConsumerService } from "./kafka.consumer";

@Injectable()
export class TestConsumer implements OnModuleInit{
    constructor(private readonly kafkaConsumer: KafkaConsumerService) {}
    async onModuleInit() {
        await this.kafkaConsumer.consume(
            {topics: ['test']}, 
            {
                eachMessage: async({ topic, partition, message })=>{
                    console.log({
                        topic: topic.toString(),
                        partition: partition.toString(),
                        message: message.value.toString()
                    })
                }
            }
        )
    }
}