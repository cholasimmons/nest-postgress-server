import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './_config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { NextFunction, Request, Response } from 'express';
import { PhotoModule } from './photos/photo.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './_guards/roles.guard';
import { JwtAuthGuard } from './_guards/jwt-auth.guard';
// import { CaslModule } from './casl/casl.module';

@Module({
  imports: [AuthModule, UsersModule, PhotoModule,
    ConfigModule.forRoot({ envFilePath: process.env.npm_package_env_NODE_ENV === 'development' ? '.env.development' : '.env.production',
      isGlobal: true, load: [configuration], cache: true,}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      // entities: [],
      synchronize: true,
      retryAttempts: 2,
      autoLoadEntities: true
    }),
    // CaslModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // { provide: APP_GUARD, useClass: RolesGuard},
    { provide: APP_GUARD, useClass: JwtAuthGuard}],
})
export class AppModule implements NestModule {
  constructor(){}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude({ path: 'denied', method: RequestMethod.ALL})
      .forRoutes({ path: '*', method: RequestMethod.ALL})
  }
}

function logger(req: Request, res: Response, next: NextFunction) {
  const now = new Date().toDateString();
  console.warn(`${req?.ip} [${req?.hostname}] : ${now}, ${req?.url}`);
  next();
}; 