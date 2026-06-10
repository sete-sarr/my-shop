import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import{APIResponseInterceptor} from'./common/interceptors/api-response-interceptor'
import{HttpExceptionFilter} from'./common/exception-filters/http-exception-filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('API Produits')
    .setDescription('Documentation API de gestion des produits')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.useGlobalInterceptors(new APIResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
