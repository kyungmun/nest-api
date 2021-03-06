import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { ArgumentOutOfRangeError } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
      transform: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('OPEN API')
    .setDescription('Kyungmun API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
