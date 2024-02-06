import { ApiProperty } from "@nestjs/swagger"
import { MinLength } from "class-validator"

export class CreateWalletRequestDto {
    @MinLength(3)
    @ApiProperty()
    name: string
}
