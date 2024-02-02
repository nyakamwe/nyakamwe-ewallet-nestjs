import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { UUID } from 'crypto';
import { WalletTransaction } from './entities/wallet-transactions.entity';
import { KafkaProducerService } from '../kafka/kafka.producer'
import  { WalletTransactionTypeEnum, WalletTransactionStatusEnum } from './enums/wallet-transactions.enum'
import { CreateWalletTransactionRequestDto } from './dto/create-wallet-transaction.dto'
import { _404 } from 'src/shared/constants';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(WalletTransaction) private walletTransactionRepository: Repository<WalletTransaction>,
    private readonly kafkaProducerService: KafkaProducerService
  ){}

  /**
   * Create a wallet
   */
  create(createWalletDto, customer) {
    const newWallet = {
      ...createWalletDto,
      balance: 0.0,
      customer: customer.id
    }

    const wallet = this.walletRepository.create(newWallet)

    return this.walletRepository.save(wallet)
  }

  /**
   * List all customer wallets
   */
  async findAll(customerId: UUID){
    const wallets = await this.walletRepository.find({where:{ customer: { id: customerId }}})

    return wallets
  }

  /**
   * Customer wallet details
   */
  async findOne(walletId: UUID, customerId: UUID) {
    const wallet = await this.walletRepository.findOneBy({ id: walletId, customer: { id: customerId }})

    if (!wallet){
      throw new NotFoundException(_404.WALLET_NOT_FOUND)
    }

    return wallet
  }

  /**
   * Increase wallet balance
   */
  // TODO:  Implement actions that done in topup service to be using transaction
  async topUp(walletId: UUID, customerId: UUID, amount: number){
    // Find wallet and increment its balance
    const existingWallet = await this.walletRepository.findOne({
      where: { id: walletId, customer: { id: customerId } },
    });

    if (!existingWallet) {
      throw new NotFoundException(_404.WALLET_NOT_FOUND);
    }
    // 1. Increment wallet balance
    await this.walletRepository.increment({ id: walletId, customer: { id: customerId }}, "balance", amount)

    // 2. Record a transaction
    const transactionData : CreateWalletTransactionRequestDto = {
      wallet: { id: walletId },
      customer: { id: customerId },
      status: WalletTransactionStatusEnum.PENDING,
      type: WalletTransactionTypeEnum.TOPUP,
      amount
    }

    const transaction = await this.walletTransactionRepository.create(transactionData)

    await this.walletTransactionRepository.save(transaction)

    // 3. Send Transaction Data to Kafka
    await this.kafkaProducerService.produce({
      topic: 'wallet-topup',
      messages: [{
        value: JSON.stringify(transactionData)
      }]
    })

    return this.findOne(walletId, customerId)
  }

  /**
   * List all transactions of a wallet
   */
  async findAllWalletTransactions(walletId: UUID, customerId: UUID) {

    return await this.walletTransactionRepository.find({ 
      where: { 
        wallet: { id: walletId }, 
        customer: { id: customerId }
      } 
    })
  }
}
