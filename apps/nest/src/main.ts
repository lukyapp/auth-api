import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}`;

  // security

  const classSerializerInterceptor = app.get(ClassSerializerInterceptor);
  const validationPipe = app.get(ValidationPipe);
  app.useGlobalInterceptors(classSerializerInterceptor);
  app.useGlobalPipes(validationPipe);

  // swagger

  const swaggerConfig = {
    path: '/docs',
    title: 'swagger title',
    description: 'swagger description',
    version: 'swagger version',
  };
  const config = new DocumentBuilder()
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
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerConfig.path, app, document);

  const swaggerPath = `${baseUrl}${swaggerConfig.path}`;
  const swaggerJsonPath = `${baseUrl}${swaggerConfig.path}-json`;

  // listen

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
  Logger.log(`🚀 Swagger UI is server on: ${swaggerPath}`);
  Logger.log(`🚀 Swagger json file is server on: ${swaggerJsonPath}`);
}

bootstrap();
