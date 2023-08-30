import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(name: string): string {
    return `Hello ${name}, from microservice "Auth"`;
  }
}
