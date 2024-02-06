import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCustomerRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    password: string
}
