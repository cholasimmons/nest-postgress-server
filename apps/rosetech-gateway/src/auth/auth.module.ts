import { Injectable, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './_strategies/jwt.strategy';
import { Repository } from 'typeorm';

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy:'jwt', property: 'user', session: false }),
    JwtModule.register({ secret: process.env.JWT_SECRET?.toString(), signOptions: { expiresIn: process.env.JWT_EXPIRESIN! }})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy/*LocalStrategy*/, Repository],
  exports: [PassportModule, JwtModule, AuthService]
})
export class AuthModule {
  constructor(){
    console.info('[AUTH MODULE] Ready for requests');
    
  }
}
