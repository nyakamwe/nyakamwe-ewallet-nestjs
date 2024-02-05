import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { RedisModule as LiaoLiaoRedisModule } from '@liaoliaots/nestjs-redis';

@Module({
    imports: [
      LiaoLiaoRedisModule.forRoot({
        config: {
          host: 'localhost',
          port: 6379,
          // password: 'authpassword',
        },
      }),
    ],
    providers: [RedisService],
    exports: [RedisService]
})

export class RedisModule {}
