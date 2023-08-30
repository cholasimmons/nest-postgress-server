import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('hello')
  hello(name: string): string {
    return this.authService.getHello(name);
  }

  @Get()
  getHello(): string {
    return this.authService.getHello('Simmons');
  }
}
