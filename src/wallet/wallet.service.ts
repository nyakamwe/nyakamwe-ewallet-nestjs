import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { UUID } from 'crypto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRespository: Repository<Wallet>
  ){}

  create(createWalletDto, customer) {
    const newWallet = {
      balance: 0.0,
      customer: customer.id
    }
    const wallet = this.walletRespository.create(newWallet)
    return this.walletRespository.save(wallet)
  }

  async findAll(customerId) {
    const wallets = await this.walletRespository.find({where:{ customer: customerId}})
    return wallets
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
