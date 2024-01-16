import { Controller, Post, Body } from '@nestjs/common';
import { CustomerSignInDto } from './dto/customer-sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('login')
    signIn(@Body() signInDto: CustomerSignInDto){
        return this.authService.signIn(signInDto.email, signInDto.password)
    }
}
