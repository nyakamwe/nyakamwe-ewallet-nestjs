import { UUID } from 'crypto'
import { WalletTransactionStatusEnum, WalletTransactionTypeEnum } from '../enums/wallet-transactions.enum'
import { IsEnum } from 'class-validator';

export class CreateWalletTransactionRequestDto {
    wallet: { id: UUID };

    customer: { id: UUID };

    @IsEnum(WalletTransactionStatusEnum)
    status: WalletTransactionStatusEnum;

    @IsEnum(WalletTransactionTypeEnum)
    type: WalletTransactionTypeEnum;

    amount: number
}
