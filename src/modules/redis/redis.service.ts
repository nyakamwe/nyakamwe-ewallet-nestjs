import { Injectable, Inject } from "@nestjs/common";
import {  CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager'

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private cacheStore: CacheStore) {}
    
    async get(key:string){
        return await this.cacheStore.get(key)
    }

    async set(key:string, value: unknown){
        return await this.cacheStore.set(key, value)
    }

    async del(key:string){
        return await this.cacheStore.del(key)
    }
}
