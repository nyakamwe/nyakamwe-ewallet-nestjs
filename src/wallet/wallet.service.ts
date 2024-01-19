import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { UUID } from 'crypto';
import { WalletTransaction } from './entities/wallet-transactions.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(WalletTransaction) private walletTransactionRepository: Repository<WalletTransaction>
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

  // TODO:  Implement actions that done in topup service to be using transaction
  async topUp(walletId: UUID, customerId: UUID, amount: number){
    // Find wallet and increment its balance
    const existingWallet = await this.walletRepository.findOne({
      where: { id: walletId, customer: { id: customerId } },
    });

    if (!existingWallet) {
      throw new NotFoundException('Wallet not found');
    }
    // 1. Increment wallet balance
    await this.walletRepository.increment({ id: walletId, customer: { id: customerId }}, "balance", amount)

    // 2. Record a transaction
    const transactionData = {
      wallet: { id: walletId },
      customer: { id: customerId },
      status: 'pending',
      type: 'topup',
      amount
    }

    const transaction = await this.walletTransactionRepository.create(transactionData)
    await this.walletTransactionRepository.save(transaction)

    return this.findOne(walletId, customerId)
  }

  async findAllWalletTransactions(walletId: UUID, customerId: UUID) {
    return await this.walletTransactionRepository.find({ 
      where: { 
        wallet: { id: walletId }, 
        customer: { id: customerId }
      } 
    })
  }
}
