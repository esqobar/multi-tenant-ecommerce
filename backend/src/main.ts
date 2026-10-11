import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import "dotenv/config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, transform: true,
    })
  )

  app.enableCors({
    origin: process.env.ORIGIN_URL
  })
  await app.listen(process.env.PORT ?? 4000);
}
await bootstrap();
