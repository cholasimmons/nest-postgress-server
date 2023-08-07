import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import helmet from 'helmet';
import { HttpExceptionFilter } from './_error-handling/http-exception.filter';
import { AllExceptionsFilter } from './_error-handling/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
 import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false, bodyParser: true });

  const corsOptions = {
    origin: 'http://localhost:'+(process.env.NEST_PORT || 3000),
    optionsSuccessStatus: 200
  };

  const config = new DocumentBuilder()
    .setTitle('Mataka Server.')
    .setDescription('Mataka API documentation.')
    .setContact('Frank Simmons', 'https://simmons.studio', 'frank@simmons.studio')
    .setVersion('0.1')
    // .addTag('General Endpoints')
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.enableCors(corsOptions)
  // app.use(cors(corsOptions));
  app.use(cookieParser());
  // app.useGlobalGuards(LocalAuthGuard());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Render Views
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen((process.env.PORT || 3000), async () => {
    console.log('Mataka Server running: ',await app.getUrl());
    console.log('Service Mode: ', process.env.npm_package_env_NODE_ENV);
    console.warn('Full Body-Armor mode: OFF');
  });
}
bootstrap();
