import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { _404, _401, _400 } from 'src/shared/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request);
    
    if(!token){
      throw new UnauthorizedException(_400.TOKEN_NOT_PROVIDED)
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY });
      // 💡 We're assigning the payload to the request object here
      // so that we can acct in our route handlers
    
      request['user'] = payload;

    } catch {
      throw new UnauthorizedException(_401.INVALID_CREDENTIALS);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
