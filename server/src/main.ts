import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer/class-serializer.interceptor';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('ImMall')
    .setDescription('ImMall API Description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
        name: 'JWT',
        in: 'header',
      },
      'userToken'
    )
    .addTag('ImMall')
    .build();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app
    .listen(process.env.PORT)
    .then(() => console.log(`Listen ${process.env.PORT}`))
    .catch((err) => console.log(err));
}
bootstrap();
