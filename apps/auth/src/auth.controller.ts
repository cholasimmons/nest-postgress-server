import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { Public } from 'apps/rosetech-gateway/src/_decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('hello')
  hello(name: string): string {
    return this.authService.getHello(name);
  }

  @Get()
  @Public()
  getHello(): string {
    console.log('root endpoint');

    return this.authService.getHello('Simmons');
  }
}
