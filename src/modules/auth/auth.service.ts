import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerSignInDto } from './dto'
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private customerService: CustomerService) { }
    async signIn(data: CustomerSignInDto) {
        const customer = await this.customerService.findOneByEmail(data.email)
        const isPasswordMatch = customer?.password ? await bcrypt.compare(data.password, customer.password) : false

        if (!isPasswordMatch) {
            throw new UnauthorizedException()
        }

        const payload = {
            sub: customer.id,
            id: customer.id,
            email: data.email
        }

        const access_token = await this.jwtService.signAsync(payload)

        return { access_token }
    }
}
