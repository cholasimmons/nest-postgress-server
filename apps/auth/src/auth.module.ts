import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { appConstants } from 'apps/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextFunction, Request } from 'express';
import { config } from 'apps/rosetech-gateway/src/_config/configuration';

@Module({
  imports: [
    /*
    ClientsModule.register([
      { name: appConstants.AUTH_SERVICE.name,
      transport: Transport.TCP, options: { port: appConstants.AUTH_SERVICE.port }
      }
    ]),*/

    // TypeORM for Databse connections
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config.database,
      entities: [],
      retryAttempts: 0,
      retryDelay: 5000,
      logging: false,
      schema: 'auth'
      //autoLoadEntities: true
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {

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
  console.warn(`[.AUTH.] ${req?.ip} [${req?.hostname}] : ${now}, ${req?.url}`);
  next();
}; 