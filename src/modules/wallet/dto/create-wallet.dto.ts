import { ApiProperty } from "@nestjs/swagger"
import { MinLength } from "class-validator"

export class CreateWalletDto {
    @MinLength(3)
    @ApiProperty()
    name: string
}
