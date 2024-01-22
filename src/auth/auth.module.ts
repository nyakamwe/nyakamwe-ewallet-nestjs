import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: '24h' },
        secret: configService.get<string>('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    CustomersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
