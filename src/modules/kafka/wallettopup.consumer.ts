import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaConsumerService } from "./kafka.consumer";

@Injectable()
export class WalletTopUpConsumer implements OnModuleInit {
    constructor(private readonly kafkaConsumerService: KafkaConsumerService){}
    async onModuleInit() {
        await this.kafkaConsumerService.consume(
            {topics: ['wallet-topup']},
            {
                eachMessage: async({ topic, message, partition})=>{
                    // TODO: There is where you perform actions when message comes to kafka
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
