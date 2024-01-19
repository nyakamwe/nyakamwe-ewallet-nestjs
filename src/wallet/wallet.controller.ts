import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';



@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    ) {}

  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  create(@Body() createWalletDto, @Request() req) {
    return this.walletService.create(createWalletDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'It helps to list wallets of a customer' })
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  findAll(@Request() req) {
    console.log('REQUEST USER', req.user);
    const { sub: customerId } = req.user
    
    return this.walletService.findAll(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
