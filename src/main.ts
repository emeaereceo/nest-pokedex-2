import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // Transforma los datos que pasas por los Dtos
      // Otra forma de transformar esta directo en el pagination.dto
      // transform:true,
      // transformOptions:{
      //   enableImplicitConversion: true,
      // }
    })
  );

  await app.listen(3000);
}
bootstrap();
