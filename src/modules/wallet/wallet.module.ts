import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletTransaction } from './entities/wallet-transactions.entity';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransaction]),
    KafkaModule
  ],
  controllers: [WalletController],
  providers: [WalletService, JwtService],
})
export class WalletModule {}
