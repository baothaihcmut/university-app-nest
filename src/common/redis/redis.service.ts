import { createClient, RedisClientType } from "@keyv/redis";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REDIS_ENDPOINT_KEY } from "../constant";
import { ClassConstructor, plainToInstance } from "class-transformer";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  constructor(private cfgService: ConfigService) {}
  onModuleDestroy() {
    this.client.disconnect();
  }
  onModuleInit() {
    this.client = createClient({
      url: this.cfgService.get<string>(REDIS_ENDPOINT_KEY),
    });
    this.client.connect();
  }
  async setString(key: string, value: string, ttl: number) {
    this.client.set(key, value, { EX: ttl * 60 });
  }
  async getString(key: string): Promise<string> {
    return await this.client.get(key);
  }
  async setObject(key: string, value: any, ttl: number) {
    this.client.set(key, JSON.stringify(value), { EX: ttl * 60 });
  }
  async getObject<T>(key: string, cls: ClassConstructor<T>): Promise<T> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const plain = JSON.parse(data);
    return plainToInstance(cls, plain);
  }
}
