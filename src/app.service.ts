import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    const documentationUrl = "http://localhost:3000/docs"
    return `Welcome to tekana e-wallet Backend implementation, checkout documentation here ${documentationUrl}`;
  }
}
