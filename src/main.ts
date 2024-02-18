import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      console.error(JSON.stringify(validationErrors));
      return new BadRequestException(validationErrors);
    },
    transform: true,
  })
  );
  await app.listen(3000);
}
bootstrap();
