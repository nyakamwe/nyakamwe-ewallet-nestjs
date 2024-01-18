import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { CustomerSignInDto } from './dto/customer-signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('login')
    @ApiOperation({ summary: 'It helps customers to login into their account'})
    signIn(@Body() signInDto: CustomerSignInDto){
        return this.authService.signIn(signInDto)
    }
}
