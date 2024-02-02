import { Controller, Post, Body, HttpCode} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerSignInDto } from './dto'
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'It helps customers to login into their account'})
    signIn(@Body() signInDto: CustomerSignInDto){
        return this.authService.signIn(signInDto)
    }
}
