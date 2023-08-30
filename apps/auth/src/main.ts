import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { appConstants } from 'apps/constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('auth');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      port: appConstants.AUTH_SERVICE.port
    }
  });
  logger.log('Microservice running')
  await app.listen();
}
bootstrap();
