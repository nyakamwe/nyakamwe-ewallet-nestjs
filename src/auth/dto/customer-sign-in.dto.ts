import { ApiProperty } from "@nestjs/swagger";
export class CustomerSignInDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string
}
