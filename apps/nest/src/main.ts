import { Utils } from '@auth/core';
import { ConfigurationServicePort } from '@auth/domain';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import crypto from 'crypto';
import { AppModule } from './app.module';
import session from 'express-session';
import { HttpExceptionFilter } from './exceptions/http-exception-filter';
import { UnknownExceptionFilter } from './exceptions/unknown-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService = app.get(ConfigurationServicePort);
  const port = configurationService.get('server.port');
  const baseUrl = configurationService.get('server.baseUrl');

  // filters

  const unknownExceptionFilter = app.get(UnknownExceptionFilter);
  const httpExceptionFilter = app.get(HttpExceptionFilter);
  app.useGlobalFilters(unknownExceptionFilter, httpExceptionFilter);

  // security

  const classSerializerInterceptor = app.get(ClassSerializerInterceptor);
  const validationPipe = app.get(ValidationPipe);
  app.useGlobalInterceptors(classSerializerInterceptor);
  app.useGlobalPipes(validationPipe);

  // sessions

  app.use(
    session({
      secret: crypto.randomBytes(32).toString('hex'),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  // swagger

  const swaggerConfig = {
    path: '/docs',
    title: configurationService.get('swagger.title'),
    description: configurationService.get('swagger.description'),
    version: configurationService.get('swagger.version'),
  };
  const configBuilder = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'userAccessToken',
    );

  for (const { name, url } of configurationService.get('swagger.servers')) {
    configBuilder.addServer(url, name);
  }

  const config = configBuilder.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerConfig.path, app, document);

  const swaggerPath = Utils.urlJoin(baseUrl, swaggerConfig.path);
  const swaggerJsonPath = Utils.urlJoin(baseUrl, `${swaggerConfig.path}-json`);

  // listen

  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${baseUrl}`);
  Logger.log(`🚀 Swagger UI is server on: ${swaggerPath}`);
  Logger.log(`🚀 Swagger json file is server on: ${swaggerJsonPath}`);
}

bootstrap().catch(console.log);
