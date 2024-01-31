import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { dataSourceOptions } from './db/data-source';
import { ConnectionModule } from './connection/connection.module';
import { RedisModule } from './modules/redis/redis.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { TestConsumer } from './modules/kafka/test.consumer';
import { NotificationModule } from './modules/notification/notification.module';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), // Should stay on top of other modules in order to load .env file

    TypeOrmModule.forRoot(dataSourceOptions),
    HttpModule,
    RedisModule,
    ConnectionModule,
    AuthModule, 
    CustomerModule, 
    WalletModule, 
    KafkaModule, 
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TestConsumer
  ],
})
export class AppModule {}
