import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
// import { AuthModule } from './auth/auth.module';
// import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { Customer } from './customers/entity/customer.entity'
import { CustomersService } from './customers/customers.service';

console.log('$$$$$$$$', __dirname + 'entity/*.{js, ts}');

@Module({
  imports: [
    ConfigModule.forRoot(), // Should stay on top of other modules in order to load .env file
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [__dirname + 'entity/*.{js, ts}'],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    CustomersModule, 
    // AuthModule, 
    // WalletModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
