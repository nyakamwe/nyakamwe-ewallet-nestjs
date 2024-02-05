import { PartialType } from '@nestjs/swagger';
import { CreateWalletRequestDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletRequestDto) {}
