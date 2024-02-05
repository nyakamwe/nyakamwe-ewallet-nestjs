import { Injectable } from '@nestjs/common';
import { RedisService as LiaoLiaoRedisService, DEFAULT_REDIS_NAMESPACE } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { CACHE_1_MINUTE } from '../../shared/constants';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor(private readonly redisService: LiaoLiaoRedisService) {
    this.redis = this.redisService.getClient();
    // or
    // this.redis = this.redisService.getClient(DEFAULT_REDIS_NAMESPACE);
  }

  /** 
   * Get cache by key 
   */
  async get(key:string){
    return await this.redis.get(key)
  }

  /**
   * Save data in cache
   */
  async set(key:string, value: any){
    return await this.redis.set(key, value, 'EX', CACHE_1_MINUTE);
  }

  /**
   * Delete a key
   */
  async del(key:string){
    return await this.redis.del(key)
  }

  /**
   * Clear all keys
   */
  async clearAllKeys(){
    return await this.redis.flushdb()
  }
}
