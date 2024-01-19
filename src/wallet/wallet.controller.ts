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
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UUID } from 'crypto';
import { TopUpWalletDto } from './dto';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    ) {}

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
  async findAll(@Request() req) {
    const { id: customerId } = req.user
    const wallets = await this.walletService.findAll(customerId);
    return {
      message: 'Customer Wallets',
      wallets
    }
  }

  @Get(':walletId')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'It helps customer to view details of wallet' })
  async findOne(@Param('walletId', ParseUUIDPipe) walletId: UUID, @Request() req) {
    const { id: customerId } = req.user
    const wallet = await this.walletService.findOne(walletId, customerId);
    if (!wallet){
      return { message: 'Wallet not found, try again' }
    }

    return {
      message: 'Customer Wallet Details',
      wallet
    }
  }

  @Patch(':walletId/topup')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'It helps customer to update wallet balance' })
  async walletTopUp(
    @Param('walletId', ParseUUIDPipe) walletId: UUID,
    @Body() topUpWalletDto: TopUpWalletDto,
    @Request() req
    ){
      const { id: customerId } = req.user
      const wallet = await this.walletService.topUp(walletId, customerId, topUpWalletDto.amount)

      return {
        message: 'Customer Wallet Topped Up successfully',
        wallet
      }
  }

  @Get(':walletId/transactions')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'It helps customer to read wallet transactions' })
  async walletTransaction(
    @Param('walletId', ParseUUIDPipe) walletId: UUID,
    @Request() req
    ){
      const { id: customerId } = req.user
      const transactions = await this.walletService.findAllWalletTransactions(walletId, customerId)
      return {
        message: "Customer Wallet Transactions",
        transactions
      }
  }

}
