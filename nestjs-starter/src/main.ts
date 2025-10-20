import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const corsEnabled = configService.get<boolean>('cors.enabled');
  const corsOrigin = configService.get<string>('cors.origin');

  if (corsEnabled) {
    app.enableCors({
      origin: corsOrigin,
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  const swaggerTitle = configService.get<string>('swagger.title');
  const swaggerDescription = configService.get<string>('swagger.description');
  const swaggerVersion = configService.get<string>('swagger.version');

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('app.port');
  const appName = configService.get<string>('app.appName');

  await app.listen(port);

  console.log(`🚀 ${appName} is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
