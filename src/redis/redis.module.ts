import { Module } from "@nestjs/common";
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigService } from "@nestjs/config";
import { redisStore } from 'cache-manager-redis-yet'
import { RedisService } from "./redis.service";

@Module({
    imports: [
        CacheModule.registerAsync({  
            isGlobal: true,  
            useFactory: async (configService: ConfigService) => ({  
              store: await redisStore({  
                socket: {  
                  host: 'localhost',  
                  port: 6379,  
                },        
              }),      
            }),   
            inject: [ConfigService] 
        }), 
    ],
    providers: [RedisService],
    exports: [RedisService]
})

export class RedisModule {}
