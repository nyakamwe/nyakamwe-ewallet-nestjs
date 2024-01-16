import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    async signIn(email: string, password: string){
        const service = new CustomersService()
        const jwtService = new JwtService()
        const customer = await service.findOne(email)

        if(customer?.password !== password){
            throw new UnauthorizedException()
        }

        // TODO: Generate a JWT and return it here
        const payload = { sub: customer.id, email: customer.email };
        return {
            access_token: await jwtService.signAsync(payload),
        };
        // return customer
    }
}
