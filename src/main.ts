import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // prefijo 
  app.setGlobalPrefix('api');
  // validate DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // tratan de transformar una propiedad
      // a el tipo especificado del dto para
      // dicha propiedad
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );

  await app.listen(3000);

}
bootstrap();
