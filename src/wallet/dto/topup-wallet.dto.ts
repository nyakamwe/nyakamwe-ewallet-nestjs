import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TopUpWalletDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    amount: number
}
