import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export default class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: '127.0.0.1', // Redis 服务器的主机名
      port: 6379, // Redis 服务器的端口
    });
  }

  setValue(key: string, value: string, time?: number) {
    if (time) {
      return this.redisClient.setex(key, time, value);
    }
    return this.redisClient.set(key, value);
  }

  getValue(key: string) {
    return this.redisClient.get(key);
  }

  deleteValue(key: string) {
    return this.redisClient.del(key);
  }
}
