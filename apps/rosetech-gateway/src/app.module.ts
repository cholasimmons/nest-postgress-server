import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './_config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { NextFunction, Request, Response } from 'express';
import { PhotoModule } from './photos/photo.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './_guards/roles.guard';
import { JwtAuthGuard } from './_guards/jwt-auth.guard';
import { StorageModule } from '@squareboat/nest-storage';
import filesystem from './_utilities/filesystem';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './_database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserEntity } from './users/entity/user.entity';
// import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.npm_package_env_NODE_ENV === 'development' ? '.env.development' : '.env.production',
    isGlobal: true, expandVariables: true, load: [configuration/*, filesystem*/], cache: false
    }),
    
    // Global rate limiting
    ThrottlerModule.forRoot({
      ttl: 60, limit: 10
    }),

    // TypeORM for Databse connections
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt((process.env.DATABASE_PORT || '5432'), 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{,ts,.js}'],
      synchronize: process.env.npm_package_env_NODE_ENV === 'development' ? true : false, // set to false in production
      retryAttempts: 0,
      retryDelay: 5000,
      logging: false
      //autoLoadEntities: true
    }),

    // Gives access to cloud storage
    /*
    StorageModule.registerAsync({
      imports: [ConfigService],
      useFactory:(config:ConfigService) => {
        return config.get('filesystem')!
      },
      inject: [ConfigService]
    }),
    */

    ClientsModule.register([
      {
        name: 'MARKET',
        transport: Transport.TCP,
        options: { port: 3001 }
      }
    ]),

    AuthModule, UsersModule, 
    // DatabaseModule
    // CaslModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // { provide: APP_GUARD, useClass: RolesGuard},
    { provide: APP_GUARD, useClass: JwtAuthGuard},
    { provide: APP_GUARD, useClass: ThrottlerGuard}
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource){}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude({ path: 'denied', method: RequestMethod.ALL})
      .forRoutes({ path: '*', method: RequestMethod.ALL})
  }
}

// Logs all route requests to console
function logger(req: Request, res: Response, next: NextFunction) {
  const now = new Date().toDateString();
  console.warn(`${req?.ip} [${req?.hostname}] : ${now}, ${req?.url}`);
  next();
}; 