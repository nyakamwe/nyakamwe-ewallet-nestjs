import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerSignInDto } from './dto/customer-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private customersService: CustomersService){}
    async signIn(data: CustomerSignInDto){
        const customer = await this.customersService.findOneByEmail(data.email)
        if(customer?.password !== data.password){
            throw new UnauthorizedException()
        }

        const payload = { 
            sub: customer.id, 
            email:data.email 
        }
        
        const access_token = await this.jwtService.signAsync(payload)

        return { access_token }
    }
}
