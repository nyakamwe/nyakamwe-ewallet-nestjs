import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot(), // Should stay on top of other modules in order to load .env file
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule, 
    CustomersModule, 
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
