import { ApiProperty } from '@nestjs/swagger'
export class CreateCustomerDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    password: string

}