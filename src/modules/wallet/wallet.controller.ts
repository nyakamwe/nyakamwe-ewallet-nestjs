import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Request, 
  ParseUUIDPipe,
  HttpCode
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UUID } from 'crypto';
import { TopUpWalletDto } from './dto';
import { Wallet } from './entities/wallet.entity';
import { WalletTransaction } from './entities/wallet-transactions.entity';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService,) {}

  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  create(@Body() createWalletDto: CreateWalletDto, @Request() req) {
    return this.walletService.create(createWalletDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'It helps to list wallets of a customer' })
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  async findAll(@Request() req): Promise<Wallet[]> {
    const { id: customerId } = req.user

     return await this.walletService.findAll(customerId);

  }

  @Get(':walletId')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'It helps customer to view details of wallet' })
  async findOne(@Param('walletId', ParseUUIDPipe) walletId: UUID, @Request() req): Promise<Wallet> {
    const { id: customerId } = req.user

    return await this.walletService.findOne(walletId, customerId);
  }

  @Patch(':walletId/topup')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'It helps customer to update wallet balance' })
  async walletTopUp(@Param('walletId', ParseUUIDPipe) walletId: UUID, @Body() topUpWalletDto: TopUpWalletDto, @Request() req ): Promise<Wallet> {
      const { id: customerId } = req.user

      return await this.walletService.topUp(walletId, customerId, topUpWalletDto.amount)
  }

  @Get(':walletId/transactions')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'It helps customer to read wallet transactions' })
  async walletTransaction(@Param('walletId', ParseUUIDPipe) walletId: UUID, @Request() req): Promise<WalletTransaction[]>{
      const { id: customerId } = req.user

      return await this.walletService.findAllWalletTransactions(walletId, customerId)
  }

}
