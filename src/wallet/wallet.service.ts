import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { UUID } from 'crypto';
import { TopUpWalletDto } from './dto'

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>
  ){}

  create(createWalletDto, customer) {
    const newWallet = {
      balance: 0.0,
      customer: customer.id
    }

    const wallet = this.walletRepository.create(newWallet)
    return this.walletRepository.save(wallet)
  }

  async findAll(customerId: UUID) {
    const wallets = await this.walletRepository.find({where:{ customer: { id: customerId }}})
    return wallets
  }

  async findOne(walletId: UUID, customerId: UUID) {
    const wallet = await this.walletRepository.findOneBy({ id: walletId, customer: { id: customerId }})
    return wallet
  }

  async topUp(walletId: UUID, customerId: UUID, balance: number){
    // Find wallet and increment its balance
    const existingWallet = await this.walletRepository.findOne({
      where: { id: walletId, customer: { id: customerId } },
    });

    if (!existingWallet) {
      throw new NotFoundException('Wallet not found');
    }

    await this.walletRepository.increment({ id: walletId, customer: { id: customerId }}, "balance", balance)
    
    return this.findOne(walletId, customerId)
  }
}
